<template>
  <b-modal
    modal-class="create-doctor-modal"
    cancel-title="Закрыть"
    ok-title="Зарегистрировать"
    ref="modal"
    @ok="onOk"
    @hidden="onHide"
    hide-header
  >
    <div class="modal-content-custom">
      <form class="modal-content-form">
        <div class="modal-content-form-item">
          <div class="modal-content-title">
            Введите номер телефона врача и задайте его аккаунту надежный пароль
          </div>
          <label class="input-wrapper">
            <span class="label">Номер телефона*:</span>
            <input
              type="tel"
              placeholder="8XXXXXXXXXX"
              v-model="phoneNumber"
              :class="{ invalid: $v.$dirty && $v.phoneNumber.$invalid }"
            />
            <span
              class="invalid-text"
              v-if="$v.$dirty && $v.phoneNumber.$invalid"
              >Номер телефона должен быть в формате 8XXXXXXXXXX</span
            >
          </label>
          <label class="input-wrapper">
            <span class="label">Email*:</span>
            <input
              type="email"
              placeholder="Email"
              v-model="email"
              :class="{ invalid: $v.$dirty && $v.email.$invalid }"
            />
            <span class="invalid-text" v-if="$v.$dirty && $v.email.$invalid"
              >Введите корректный Email</span
            >
          </label>
        </div>
        <div class="modal-content-form-item">
          <div class="modal-content-title">
            Укажите ФИО врача и добавьте фото
          </div>
          <div class="modal-content-form-item-wrapper">
            <div class="modal-content-right">
              <label class="input-wrapper">
                <span class="label">Фамилия*:</span>
                <input
                  type="text"
                  placeholder="Фамилия"
                  v-model="lastName"
                  :class="{ invalid: $v.$dirty && $v.lastName.$invalid }"
                />
                <span
                  class="invalid-text"
                  v-if="$v.$dirty && $v.lastName.$invalid"
                  >Введите Вашу фамилию</span
                >
              </label>
              <label class="input-wrapper">
                <span class="label">Имя*:</span>
                <input
                  type="text"
                  placeholder="Имя"
                  v-model="firstName"
                  :class="{ invalid: $v.$dirty && $v.firstName.$invalid }"
                />
                <span
                  class="invalid-text"
                  v-if="$v.$dirty && $v.firstName.$invalid"
                  >Введите Ваше имя</span
                >
              </label>
              <label class="input-wrapper">
                <span class="label">Отчество*:</span>
                <input
                  type="text"
                  placeholder="Отчество"
                  v-model="middleName"
                  :class="{ invalid: $v.$dirty && $v.middleName.$invalid }"
                />
                <span
                  class="invalid-text"
                  v-if="$v.$dirty && $v.middleName.$invalid"
                  >Введите Ваше отчество</span
                >
              </label>
              <label class="input-wrapper">
                <span class="label">Специализация*:</span>
                <input
                  type="text"
                  placeholder="Специализация"
                  v-model="specialization"
                  :class="{ invalid: $v.$dirty && $v.specialization.$invalid }"
                />
                <span
                  class="invalid-text"
                  v-if="$v.$dirty && $v.specialization.$invalid"
                  >Введите Вашу специализацию</span
                >
              </label>
            </div>
            <div class="modal-content-left">
              <label class="input-image-wrapper">
                <span class="label">Добавить фото</span>
                <input
                  class="file-upload"
                  type="file"
                  accept="image/*"
                  @input="uploadImage"
                />
                <img
                  class="image-preview"
                  v-if="imgSrc"
                  :src="imgSrc"
                  alt="avatar"
                />
              </label>
              <div class="input-image-cropper" v-if="isCropping">
                <vue-cropper
                  v-if="isCropping && croppedImage"
                  :aspectRatio="1"
                  ref="cropper"
                  :src="croppedImage"
                  highlight
                  :minContainerWidth="getCropperContainerWidth"
                  :minContainerHeight="getCropperContainerHeight"
                  :viewMode="1"
                />
                <div class="btn-container">
                  <button @click.prevent="onCrop">Обрезать</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </b-modal>
</template>

<script>
function initData() {
  return {
    phoneNumber: "",
    email: "",
    lastName: "",
    firstName: "",
    middleName: "",
    specialization: "",
    avatar: ""
  }
}

import { required, numeric, email, minLength } from "vuelidate/lib/validators"

const phone = value => value.length === 11 && value.slice(0, 1) === "8"

export default {
  name: "CreateDoctorModal",
  data() {
    return {
      ...initData(),
      imgSrc: "",
      isCropping: false,
      croppedImage: ""
    }
  },
  computed: {
    getCropperContainerWidth() {
      if (window.innerWidth < 576) {
        return window.innerWidth
      }
      return this.$refs.modal.$refs.dialog.clientWidth
    },
    getCropperContainerHeight() {
      if (window.innerWidth < 576) {
        return window.innerHeight
      }
      return this.$refs.modal.$refs.dialog.clientHeight - 70
    }
  },
  methods: {
    onShow() {
      Object.assign(this.$data, initData())
      this.$refs.modal.show()
    },
    async onOk(e) {
      if (!this.$v.$invalid) {
        const data = {
          phoneNumber: this.phoneNumber,
          email: this.email,
          lastName: this.lastName,
          firstName: this.firstName,
          middleName: this.middleName,
          specialization: this.specialization,
          avatar: this.avatar
        }
        await this.$store.dispatch("registration", { vm: this, data })
        this.$refs.modal.hide()
      } else {
        e.preventDefault()
        this.$v.$touch()
      }
    },
    onHide() {
      this.$v.$reset()
    },
    uploadImage(e) {
      this.isCropping = true
      const reader = new FileReader()
      const img = e.target.files[0]
      reader.onloadend = () => {
        this.imgSrc = reader.result
        this.croppedImage = reader.result
      }
      reader.readAsDataURL(img)
    },
    onCrop() {
      this.imgSrc = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.croppedImage = ""
      this.isCropping = false
    }
  },
  validations: {
    phoneNumber: {
      required,
      numeric,
      phone
    },
    email: {
      email,
      required
    },
    lastName: {
      required,
      minLength: minLength(2)
    },
    firstName: {
      required,
      minLength: minLength(2)
    },
    middleName: {
      required,
      minLength: minLength(2)
    },
    specialization: {
      required,
      minLength: minLength(2)
    }
  }
}
</script>
