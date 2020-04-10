<template>
	<div>
		<confirm ref="confirm"></confirm>

		<section
			v-if="session.isActive"
			class="overflow-y-auto"
			style="height: 85vh"
		>
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
			</v-toolbar>
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
					<v-col cols="1">
						<v-btn
							:disabled="disabled"
							text
							color="primary"
							@click="sendQuestion"
							><v-icon>mdi-send</v-icon></v-btn
						>
					</v-col>
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
					<v-card>
						<v-card-title> {{ activeQuestionAnswers.question }} </v-card-title>
						<v-card-text>
							{{ activeQuestionAnswers.answers }}
							<v-data-table
								:headers="headers"
								:items="activeQuestionAnswers.answers"
								class="elevation-1"
								hide-default-footer
							></v-data-table>
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</section>
		<section v-else></section>
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
	computed: {
		session() {
			return this.$store.state.session;
		}
	},
	data() {
		return {
			timer: false,
			disabled: false,
			dialog: false,
			activeQuestion: "",
			newQuestion: "",
			activeQuestionAnswers: [],
			interval: 0,
			value: 0,
			headers: [
				{ text: "Студент", value: "userName" },
				{ text: "Ответ", value: "answer" },
				{ text: "Оценка", value: "mark" }
			]
		};
	},
	methods: {
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
			this.activeQuestion = id;
			// setInterval(() => {
			this.$store
				.dispatch("getQuestionAnswers", { id, testId: this.id })
				.then(resp => {
					this.activeQuestionAnswers = {
						question: resp.data.question,
						answers: resp.data.answers
					};
				});
			// }, 3000);
		},
		rateAnswer(questionId) {
			this.$store
				.dispatch("rateAnswer", { id: this.id, questionId: questionId })
				.then(resp => {
					console.log(resp);
				});
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
		}
	},
	mounted() {
		this.$store.dispatch("getSession", this.id);
	},
	async beforeRouteLeave(to, from, next) {
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
