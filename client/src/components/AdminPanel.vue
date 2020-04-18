<template>
	<div>
		<v-card-title>
			<v-dialog v-model="dialog" persistent max-width="600px">
				<template v-slot:activator="{ on }">
					<v-btn color="primary" dark v-on="on">Добавить сессию</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">Добавление сессии</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row no-gutters>
								<v-col cols="12">
									<v-text-field
										regular
										label="Название сессии *"
										v-model="session.title"
									>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col cols="12">
									<v-text-field
										regular
										label="Описание *"
										v-model="session.description"
									>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col cols="12">
									<v-text-field
										regular
										label="Время на ответ *"
										persistent-hint
										hint="(в секундах)"
										v-model="session.timeToAnswer"
									>
									</v-text-field>
								</v-col>
							</v-row>
						</v-container>
						<small>*обязательные к заполнению поля</small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="dialog = false"
							>Закрыть</v-btn
						>
						<v-btn color="blue darken-1" text @click="addSession"
							>Сохранить</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card-title>

		<v-card-text>
			<v-row>
				<v-col>
					<v-card>
						<v-card-title>Мои сессии</v-card-title>
						<v-card-text :key="rerenderKey">
							<v-list class="overflow-y-auto" style="max-height: 60vh">
								<div v-for="session in sessions" :key="session._id">
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title
												v-text="session.title"
											></v-list-item-title>
											<v-list-item-subtitle
												v-text="session.description"
											></v-list-item-subtitle>
										</v-list-item-content>

										<v-list-item-action>
											<v-btn
												color="primary"
												@click="forwardToSession(session._id)"
												>Перейти</v-btn
											>
										</v-list-item-action>
									</v-list-item>
									<v-divider></v-divider>
								</div>
							</v-list>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-card-text>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			session: {
				title: "",
				description: "",
				timeToAnswer: 40
			},
			sessions: [],
			rerenderKey: 1
		};
	},
	methods: {
		addSession() {
			this.$store
				.dispatch("addSession", this.session)
				.then(resp => {
					this.forwardToSession(resp._id);
					// this.$store.dispatch("getSessions").then(data => {
					// 	this.sessions = data;
					// 	this.rerenderKey++;
					// 	this.dialog = false;
					// });
				})
				.catch(err => {
					console.error(err);
				});
		},
		forwardToSession(id) {
			this.$router.push({ name: "AdminSession", params: { id: id } });
		}
	},
	mounted() {
		this.$store
			.dispatch("getSessions")
			.then(data => {
				this.sessions = data;
			})
			.catch(err => {
				console.error(err);
			});
	}
};
</script>

<style>
.add-session .vs-dialog {
	width: 50vw;
	height: max-content;
}
</style>
