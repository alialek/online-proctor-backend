<template>
	<div class="main">
		<vs-dialog
			:loading="loading"
			v-model="activeDialog"
			prevent-close
			not-close
		>
			<vs-alert v-model="error">
				<p>Ошибка!</p>
				<ul>
					<li v-for="(error, index) in errors" :key="index">{{ error.msg }}</li>
				</ul>
			</vs-alert>
			<template #header>
				<h4 v-if="auth" class="not-margin">Вход в <b>аккаунт</b></h4>
				<h4 v-else class="not-margin">Регистрация</h4>
			</template>
			<div class="con-form">
				<validation-provider v-if="!auth" rules="required" v-slot="{ errors }">
					<vs-input v-model="name" placeholder="Фамилия Имя">
						<template #icon>
							<i class="bx bx-smile"></i>
						</template>
						<template #message-danger>
							{{ errors[0] }}
						</template>
					</vs-input>
				</validation-provider>
				<validation-provider v-if="!auth" rules="required" v-slot="{ errors }">
					<vs-input v-model="group" placeholder="Учебная группа">
						<template #icon>
							<i class="bx bxs-group"></i>
						</template>
						<template #message-danger>
							{{ errors[0] }}
						</template>
					</vs-input>
				</validation-provider>
				<validation-provider v-if="!auth" rules="required" v-slot="{ errors }">
					<vs-input v-model="isu" placeholder="Номер ИСУ">
						<template #icon>
							<i class="bx bxs-cctv"></i>
						</template>
						<template #message-danger>
							{{ errors[0] }}
						</template>
					</vs-input>
				</validation-provider>
				<validation-provider
					v-slot="{ errors }"
					:rules="`${!auth ? 'required|email' : ''}`"
				>
					<vs-input
						slot="errors[0]"
						v-model="email"
						placeholder="Электронная почта"
					>
						<template #icon>
							@
						</template>
						<template #message-danger>
							{{ errors[0] }}
						</template>
					</vs-input>
				</validation-provider>
				<validation-observer>
					<validation-provider
						:rules="`${!auth ? 'required|minmax:6,24|password:@confirm' : ''}`"
						v-slot="{ errors }"
					>
						<vs-input type="password" v-model="password" placeholder="Пароль">
							<template #icon>
								<i class="bx bxs-lock"></i>
							</template>
							<template #message-danger>
								{{ errors[0] }}
							</template>
						</vs-input>
					</validation-provider>
					<validation-provider v-if="!auth" name="confirm" rules="required">
						<vs-input
							type="password"
							v-model="passwordConf"
							placeholder="Повторите пароль"
							Жзк
						>
							<template #icon>
								<i class="bx bxs-lock-alt"></i>
							</template>
							<template #message-danger>
								{{ errors[0] }}
							</template>
						</vs-input>
					</validation-provider>
				</validation-observer>
			</div>

			<!-- Добавить Google CAPTCHA -->

			<template #footer>
				<div v-if="auth" class="footer-dialog">
					<vs-button class="btn-primary" block @click="login">
						Вход
					</vs-button>

					<div class="new">
						Нет аккаунта?
						<span @click="auth = false" class="link">Зарегистрируйтесь</span>
					</div>
				</div>
				<div v-else class="footer-dialog">
					<vs-button block @click="register">
						Регистрация
					</vs-button>

					<div class="new">
						Уже есть аккаунт?
						<span @click="auth = true" class="link">Войдите</span>
					</div>
				</div>
			</template>
		</vs-dialog>
	</div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("email", {
	...email,
	message: "Введите корректный адрес электронной почты"
});
extend("required", {
	...required,
	message: "Это поле обязательно к заполнению"
});
extend("password", {
	params: ["target"],
	validate(value, { target }) {
		return value === target;
	},
	message: "Пароли не совпадают"
});
extend("minmax", {
	validate(value, { min, max }) {
		return value.length >= min && value.length <= max;
	},
	params: ["min", "max"],
	message: "Пароль должен содержать от 6 до 24 символов"
});

export default {
	components: {
		ValidationProvider,
		ValidationObserver
	},
	data() {
		return {
			name: "",
			email: "",
			password: "",
			group: "",
			isu: "",
			active: true,
			auth: true,
			passwordConf: "",
			errors: []
		};
	},
	methods: {
		login: function() {
			let email = this.email;
			let password = this.password;
			this.$store
				.dispatch("login", { email, password })
				.then(resp => {
					if (resp.data.user.isAdmin) {
						this.$router.push("/admin");
					} else {
						this.$router.push("/dashboard");
					}
					this.active = false;
				})
				.catch(errResp => {
					this.errors = errResp;
				});
		},
		register: function() {
			let user = {
				name: this.name,
				email: this.email,
				password: this.password,
				tabId: this.isu,
				group: this.group
			};
			this.$store
				.dispatch("register", user)
				.then(() => this.$router.push("/dashboard"))
				.catch(errResp => {
					console.log(errResp);
				});
		}
	},
	computed: {
		loading() {
			return this.$store.getters.authStatus == "loading";
		},
		activeDialog: {
			get: function() {
				return !this.$store.getters.isLoggedIn;
			},
			set: function() {
				return;
			}
		},
		error: {
			get: function() {
				return !!this.errors.length;
			},
			set: function() {
				return;
			}
		}
	}
};
</script>

<style lang="scss">
.not-margin {
	margin: 0px;
	font-weight: normal;
	padding: 10px;
}
.con-form {
	width: 100%;
	.flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
		a {
			font-size: 0.8rem;
			opacity: 0.7;
			&:hover {
				opacity: 1;
			}
		}
	}
	.vs-checkbox-label {
		font-size: 0.8rem;
	}
	.vs-input-content {
		margin: 10px 0px;
		width: calc(100%);
		.vs-input {
			width: 100%;
		}
	}
}
.footer-dialog {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: calc(100%);
	.new {
		margin: 0px;
		margin-top: 20px;
		padding: 0px;
		font-size: 0.8rem;
		.link {
			color: $primary-color !important;
			margin-left: 6px;
			cursor: pointer;
			&:hover {
				color: $secondary-color !important;
			}
		}
	}
	.vs-button {
		margin: 0px;
	}
}
</style>
