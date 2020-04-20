<template>
	<div class="container404">
		<div class="error404">
			<span class="error404__icon">404 :(</span>
			<div class="error404__text">
				В строке поиска возникла проблема и страница не была найдена. Мы
				собираем информацию об ошибке и через некоторое время перенаправим вас.
			</div>
			<div class="error404__status">Перенаправление через {{ delay }}...</div>
			<div class="error404__info">
				<div class="qr-code">
					<router-link to="/">
						<img src="@/assets/qrcode.svg" alt="QR Code" />
					</router-link>
				</div>
				<div class="info-text">
					Для более детальной информации об ошибке 404 и причинах возникновения
					посетите https://ru.wikipedia.org/wiki/Ошибка_404
					<div class="info-text--small">
						Код ошибки: 404 - Not Found
						<br />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { setInterval, clearInterval } from "timers";
export default {
	name: "error404",
	data() {
		return {
			delay: 10
		};
	},
	methods: {
		redirectDelay() {
			var i = setInterval(() => {
				this.delay -= 1;
				if (this.delay <= 0) {
					clearInterval(i);
					this.$router.replace("/auth");
				}
			}, 1000);
		}
	},
	mounted() {
		this.redirectDelay();
	}
};
</script>

<style lang="scss" scoped>
.container404 {
	z-index: 999999;
	font-family: "Segoe UI", sans-serif;
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #1173aa;
	color: #fefeff;
	overflow: hidden;
}
.error404 {
	width: 50vw;
	font-weight: 300;
	@include respond-to("mobile") {
		width: 70vw;
	}
	@include respond-to("phone") {
		width: 90vw;
	}
	&__icon {
		display: block;
		font-size: 10vw;
		margin-bottom: 2.5vw;
		font-weight: normal;
		@include respond-to("mobile") {
			font-size: 15vw;
			margin-bottom: 3vw;
		}
		@include respond-to("phone") {
			font-size: 20vw;
			margin-bottom: 5vw;
		}
	}
	&__text {
		font-size: 1.7vw;
		line-height: 1.5;
		margin-bottom: 3vw;
		@include respond-to("mobile") {
			font-size: 3vw;
			margin-bottom: 3vw;
		}
		@include respond-to("phone") {
			font-size: 5vw;
			margin-bottom: 5vw;
		}
	}
	&__status {
		font-size: 1.7vw;
		margin-bottom: 3vw;
		@include respond-to("mobile") {
			font-size: 3vw;
			margin-bottom: 3vw;
		}
		@include respond-to("phone") {
			font-size: 5vw;
			margin-bottom: 5vw;
		}
	}
	&__info {
		display: flex;
		justify-content: space-between;
		.qr-code {
			img {
				width: 12vw;
				height: 12vw;
				margin-right: 1.5vw;
				@include respond-to("mobile") {
					width: 15vw;
					height: 15vw;
				}
				@include respond-to("phone") {
					width: 20vw;
					height: 20vw;
				}
			}
		}
		.info-text {
			font-size: 1.2vw;
			line-height: 1.5;
			@include respond-to("mobile") {
				font-size: 2.2vw;
			}
			@include respond-to("phone") {
				font-size: 3vw;
			}

			&--small {
				font-size: 1vw;
				margin-top: 2vw;
				@include respond-to("mobile") {
					font-size: 2vw;
					margin-top: 1.5vw;
				}
				@include respond-to("phone") {
					font-size: 2.5vw;
				}
			}
		}
	}
}
</style>
