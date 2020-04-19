<template>
	<div v-if="session">
		<confirm ref="confirm"></confirm>

		<section
			v-if="session.isActive"
			class="overflow-y-auto"
			style="height: 85vh; overflow-x: hidden"
		>
			<v-toolbar flat>
				<v-toolbar-title class="">{{ session.title }}</v-toolbar-title>

				<v-spacer></v-spacer>
				<h2 class="subtitle-2">
					Время ответа: {{ session.timeToAnswer + " c." }}
				</h2>
				<v-spacer></v-spacer>
				<h2 class="subtitle-2">
					Участников: {{ session.participants.length }}
				</h2>
				<v-spacer></v-spacer>
				<h2 class="subtitle-2">
					Статус сессии: {{ session.isActive ? "активна" : "неактивна" }}
				</h2>
				<v-spacer></v-spacer>
				<v-btn color="red" dark @click="goToAdminPanel">
					Завершить
				</v-btn>
			</v-toolbar>
			<v-row dense class="justify-center">
				<v-chip link class="ma-2" color="primary" @click="copyLink">
					{{ `https://app.netquest.ru/session/?id=${session._id}` }}
				</v-chip>
			</v-row>
			<v-toolbar flat height="25">
				<v-progress-linear
					:active="timer"
					v-model="value"
					stream
					color="primary"
					absolute
					bottom
				>
				</v-progress-linear>
			</v-toolbar>

			<v-divider></v-divider>

			<v-form @submit="sendQuestion">
				<v-row class="mx-4 align-center">
					<v-col cols="9">
						<v-text-field
							v-model="newQuestion"
							outlined
							hide-details
							label="Введите новый вопрос"
						></v-text-field>
					</v-col>
					<!-- <v-col cols="1">
						<v-btn
							:disabled="disabled"
							text
							color="primary"
							@click="sendQuestion"
							><v-icon>mdi-send</v-icon></v-btn
						>
					</v-col> -->
					<v-col cols="2">
						<v-btn
							:disabled="disabled"
							:loading="disabled"
							color="primary"
							@click="sendQuestion"
						>
							Отправить
						</v-btn>
					</v-col>
				</v-row>
			</v-form>

			<v-tabs vertical>
				<v-tab
					v-for="(question, index) in session.questions"
					:key="question._id"
					@click="getQuestionAnswers(question._id)"
				>
					{{ index + 1 }}. {{ question.question }}
				</v-tab>

				<v-tab-item v-for="question in session.questions" :key="question._id">
					<h2>{{ activeQuestionAnswers.question }}</h2>

					<v-data-table
						:headers="headers"
						:items="activeQuestionAnswers.answers"
						class="elevation-1"
						hide-default-footer
					></v-data-table>
				</v-tab-item>
			</v-tabs>
		</section>
		<section v-else>
			<v-toolbar flat>
				<v-toolbar-title class="">{{ session.title }}</v-toolbar-title>
				<v-spacer></v-spacer>
				<h2 class="subtitle-2">
					Время ответа: {{ session.timeToAnswer + " c." }}
				</h2>
				<v-spacer></v-spacer>
				<h2 class="subtitle-2">
					Статус сессии: {{ session.isActive ? "активна" : "неактивна" }}
				</h2>
				<v-spacer></v-spacer>
				<v-btn color="primary" dark @click="goToAdminPanel">
					Назад
				</v-btn>
			</v-toolbar>
			<v-tabs vertical>
				<v-tab
					v-for="(participant, index) in session.participants"
					:key="participant._id"
				>
					<!-- <v-badge :content="participant.score"> -->
					{{ index + 1 }}. {{ participant.userName }}
					<!-- </v-badge> -->
					<v-avatar class="ml-2" color="primary" size="26">
						<span class="white--text subtitle-2">{{ participant.score }}</span>
					</v-avatar>
				</v-tab>

				<v-tab-item
					v-for="(participant, index) in session.participants"
					:key="index"
				>
					<v-data-table
						:headers="headersInactive"
						:items="participant.answers"
						class="elevation-1"
						hide-default-footer
					>
						<template v-slot:item.setmark="{ item }">
							<v-row>
								<v-btn
									fab
									color="error"
									@click="setMark(item, 1)"
									depressed
									x-small
									>1</v-btn
								>
								<v-btn
									fab
									color="warning"
									@click="setMark(item, 2)"
									class="ml-1"
									depressed
									x-small
									>2</v-btn
								>
								<v-btn
									fab
									color="success"
									@click="setMark(item, 3)"
									class="ml-1"
									depressed
									x-small
									>3</v-btn
								>
							</v-row>
						</template>
					</v-data-table>
				</v-tab-item>
			</v-tabs>
		</section>
	</div>
</template>

<script>
import Confirm from "./Confirm";
export default {
	components: {
		Confirm
	},
	props: {
		id: {
			required: true,
			type: String
		}
	},

	data() {
		return {
			timer: false,
			disabled: false,
			dialog: false,
			session: {},
			activeInterval: {},
			activeQuestion: "",
			newQuestion: "",
			activeQuestionAnswers: [],
			interval: 0,
			value: 0,
			headers: [
				{ text: "Студент", value: "userName" },
				{ text: "Ответ", value: "answer" },
				{ text: "Оценка", value: "mark" }
			],
			headersInactive: [
				{ text: "Вопрос", value: "question" },
				{ text: "Ответ", value: "answer" },
				{ text: "Оценка", value: "mark" },
				{ text: "Оценить", value: "setmark" }
			]
		};
	},
	methods: {
		setMark(item, mark) {
			console.log(item);
			let payload = {
				mark,
				answerId: item._id,
				id: this.id,
				questionId: item.questionId
			};
			item.mark = mark;
			this.$store
				.dispatch("rateAnswer", payload)
				.then(() => {})
				.catch(() => {
					item.mark = "нет";
				});
		},
		sendQuestion(e) {
			e.preventDefault();
			this.$store
				.dispatch("sendQuestion", {
					id: this.id,
					question: this.newQuestion
				})
				.then(res => {
					if (res.status == 200) {
						this.disabled = true;
						this.timer = true;
						this.startTimer();
						setTimeout(() => {
							this.disabled = false;
							clearInterval(this.interval);
							this.timer = false;
						}, this.session.timeToAnswer * 1000 + 3);
					}
					this.$store.dispatch("getSession", this.id);
					this.getQuestionAnswers(res.data._id);
				});
		},
		startTimer() {
			clearInterval(this.interval);
			this.value = 100;
			let step = 100 / this.session.timeToAnswer;
			this.interval = setInterval(() => {
				this.value -= step;
			}, 1000);
		},
		getQuestionAnswers(id) {
			if (id !== this.activeQuestion) {
				clearInterval(this.activeInterval);
				this.activeQuestion = id;
			} else {
				this.activeQuestion = id;
			}
			this.activeInterval = setInterval(() => {
				this.$store
					.dispatch("getQuestionAnswers", { id, testId: this.id })
					.then(resp => {
						this.activeQuestionAnswers = {
							question: resp.data.question,
							answers: resp.data.answers
						};
					});
			}, 3000);
		},
		leaveSession() {
			this.$store
				.dispatch("disableSession", this.id)
				.then(() => {
					this.$router.push({ name: "AdminPanel" });
				})
				.catch(err => {
					console.error(err);
				});
		},
		copyLink() {
			try {
				this.copyTextToClipboard(
					`https://app.netquest.ru/session/?id=${this.session._id}`
				);
				this.$store.commit("SET_SUCCESS", "Ссылка скопирована в буфер обмена");
			} catch (error) {
				this.$store.commit("SET_ERROR", "Скопируйте ссылку самостоятельно");
			}
		},
		goToAdminPanel() {
			this.$router.push({ name: "AdminPanel" }).catch(() => {});
		},
		copyTextToClipboard(text) {
			if (!navigator.clipboard) {
				this.fallbackCopyTextToClipboard(text);
				return;
			}
			navigator.clipboard.writeText(text).then(
				() => {
					this.$store.commit("SET_INFO", "Ссылка скопирована в буфер обмена");
				},
				() => {
					this.$store.commit("SET_INFO", "Скопируйте ссылку самостоятельно");
				}
			);
		},
		fallbackCopyTextToClipboard(text) {
			var textArea = document.createElement("textarea");
			textArea.value = text;

			// Avoid scrolling to bottom
			textArea.style.top = "0";
			textArea.style.left = "0";
			textArea.style.position = "fixed";

			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			try {
				document.execCommand("copy");
				this.$store.commit("SET_INFO", "Ссылка скопирована в буфер обмена");
			} catch (err) {
				this.$store.commit("SET_INFO", "Скопируйте ссылку самостоятельно");
			}

			document.body.removeChild(textArea);
		}
	},
	mounted() {
		this.$store.dispatch("getSession", this.id).then(data => {
			if (data.participants && data.participants.length > 0) {
				data.participants.forEach(participant => {
					if (participant.answers.length > 0) {
						participant.score = participant.answers.reduce(
							(acc, curr) => acc.mark + curr.mark
						).mark;
					}
				});
			}

			this.session = data;
		});
	},
	async beforeRouteLeave(to, from, next) {
		if (this.session.isActive) {
			if (
				await this.$refs.confirm.open(
					"Завершение сессии",
					"Вы точно хотите завершить текущую сессию?",
					{ color: "red" }
				)
			) {
				this.$store
					.dispatch("disableSession", this.id)
					.then(() => {
						next();
					})
					.catch(err => {
						console.error(err);
						next(false);
					});
			} else {
				next(false);
			}
		} else {
			next();
		}
	},
	beforeDestroy() {
		clearInterval(this.interval);
	}
};
</script>

<style>
.admin.wrapper {
	padding: 0;
}
</style>
