<template>
	<div class="dashboard wrapper">
		<v-row class="justify-center align-center align-items-bottom">
			<v-col xs="12" md="6" lg="6">
				<v-img src="../assets/vector.svg" max-height="350" contain></v-img>
			</v-col>
		</v-row>
		<v-row class="justify-center align-center align-items-center">
			<v-col xs="12" md="6" lg="6">
				<v-card>
					<v-card-title>
						Введите ID сессии
					</v-card-title>
					<v-card-text>
						<v-form @submit="startNewSession">
							<v-text-field v-model="id" label="Идентификатор" outlined>
							</v-text-field>
							<v-btn type="submit" color="primary" depressed>
								Войти</v-btn
							></v-form
						>
					</v-card-text>
				</v-card></v-col
			>
		</v-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			id: ""
		};
	},

	methods: {
		startNewSession(e) {
			e.preventDefault();

			window.location.href = "/session/?id=" + this.id;
		}
	},
	mounted() {
		if (this.$route.query.id) this.id = this.$route.query.id;
	}
};
</script>

<style scoped>
.dashboard.wrapper {
	height: 100vh;
	overflow: hidden;
	margin-top: 10px;
	/* display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; */
}
</style>
