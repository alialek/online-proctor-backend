<template>
	<div id="app">
		<v-app id="test-service">
			<div class="header" v-if="isLoggedIn">
				<div class="header__logo">Система онлайн-тестирования</div>

				<div class="header__user">
					<!-- <vs-avatar primary>
					<template #text>
						{{ name[0] }}
					</template>
				</vs-avatar> -->
					<!-- <div>
					{{ name }}
				</div> -->
				</div>
				<div class="header__admin" v-if="isAdmin">
					<v-btn @click="goToAdminPanel" color="primary" dark>
						Панель администратора
					</v-btn>
				</div>
				<div class="header__exit">
					<v-btn @click="logout" v-if="!isActiveSession" color="red" dark>
						Выход
					</v-btn>
				</div>
			</div>

			<router-view />
			<v-snackbar
				style="z-index:3000"
				:color="snackbar.color"
				v-model="snackbar.enabled"
				:timeout="3000"
			>
				{{ snackbar.text }}
				<v-btn text @click="snackbar.enabled = false">ОК</v-btn>
			</v-snackbar>
		</v-app>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	computed: {
		isLoggedIn: function() {
			return this.$store.getters.isLoggedIn;
		},
		name: function() {
			return this.$store.getters.name;
		},
		email: function() {
			return this.$store.getters.email;
		},
		isAdmin: function() {
			return this.$store.getters.isAdmin;
		},
		snackbar() {
			return this.$store.state.process.snack;
		},
		isActiveSession() {
			if (this.$store.getters.session) {
				return this.$store.getters.session.isActive;
			} else {
				return false;
			}
		}
	},
	methods: {
		logout: function() {
			this.$store.dispatch("logout").then(() => {
				this.$router.push("/auth");
			});
		},
		goToAdminPanel: function() {
			this.$router.push({ path: "/admin" }).catch(() => {});
		}
	}
};
</script>
<style lang="scss">
html {
	font-size: 20px;
}
#app {
	height: 100%;
	width: 100vw;
}
#test-service {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.vs-button {
	font-family: "Nunito", sans-serif !important;
	font-weight: bold;
	font-size: 1rem !important;
}
.header {
	position: fixed;
	top: 0;
	height: 7vh;
	width: 100%;
	padding: 0 5vw;
	border-radius: 0 0 3px 3px;
	background: $light-color;
	// box-shadow: 0 5px 8px 0 rgba(0, 0, 0, var(--vs-shadow-opacity));
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
	display: flex;
	justify-content: center;
	align-items: center;

	&__logo {
		flex: 8;
	}
	&__user {
		font-size: 1rem;
		flex: 2;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	&__exit {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 2;
	}
}
.main {
	width: 100%;
	height: 100%;
	padding-top: 9vh;
	background: #1976d2;
	// background: linear-gradient(51.79deg, #655af3 -23.83%, #a59bff 92.58%);
}
.wrapper {
	width: 80vw;
	height: 89vh;
	border-radius: 20px;
	margin: 0 auto;
}
.nav-link {
	font-size: 1.2rem;
	color: $dark-color !important;
	cursor: pointer;
	transition: 0.15s cubic-bezier(0.075, 0.82, 0.165, 1);
	&:hover {
		color: $primary-color !important;
	}
}

.btn {
	background: linear-gradient(187.58deg, #9e94ff 0%, #7e72f2 99.2%);
	box-shadow: -1px 1px 8px rgba(126, 114, 242, 0.578726);
	border-radius: 4px;
	padding: 7px 15px;
	color: #fff;
	&-danger {
		background: linear-gradient(
			205.54deg,
			rgba(234, 84, 85, 0.52) 0%,
			#ea5455 99.2%
		);
		box-shadow: -1px 1px 8px rgba(234, 84, 85, 0.578726);
		&:hover {
			background: linear-gradient(
				205.54deg,
				rgba(234, 84, 85, 0.52) 0%,
				#e94343 99.2%
			);
			transform: translateY();
		}
	}
	&-success {
		background: linear-gradient(187.58deg, #1eddc5 0%, #21cfd3 99.2%);
		box-shadow: -1px 1px 8px rgba(30, 221, 197, 0.578726);
	}
}
.v-tab {
	min-width: 360px !important;
	letter-spacing: normal !important;
	text-transform: none !important;
	justify-content: flex-start !important;
}
</style>
