<template>
  <b-modal
    modal-class="create-doctor-modal"
    cancel-title="Закрыть"
    ok-title="Зарегистрировать"
    ref="modal"
    @ok="onOk"
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
              placeholder="8XXXXXXXXX"
              v-model="phoneNumber"
              :class="{ invalid: $v.$dirty && $v.phoneNumber.$invalid }"
            />
          </label>
          <label class="input-wrapper">
            <span class="label">Email:</span>
            <input type="email" placeholder="Email" v-model="email" />
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
                <input type="text" placeholder="Фамилия" v-model="lastName" />
              </label>
              <label class="input-wrapper">
                <span class="label">Имя*:</span>
                <input type="text" placeholder="Имя" v-model="firstName" />
              </label>
              <label class="input-wrapper">
                <span class="label">Отчество*:</span>
                <input
                  type="text"
                  placeholder="Отчество"
                  v-model="middleName"
                />
              </label>
              <label class="input-wrapper">
                <span class="label">Специализация*:</span>
                <input
                  type="text"
                  placeholder="Специализация"
                  v-model="specialization"
                />
              </label>
            </div>
            <div class="modal-content-left">
              <label class="input-image-wrapper">
                <span class="label">Добавить фото</span>
                <input class="file-upload" type="file" accept="image/*" />
              </label>
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
      ...initData()
    }
  },
  methods: {
    onShow() {
      Object.assign(this.$data, initData())
      this.$refs.modal.show()
    },
    onOk(e) {
      console.log(this.$v)
      if (!this.$v.$invalid) {
        console.log("hello")
      } else {
        e.preventDefault()
        this.$v.$touch()
      }
    }
  },
  validations: {
    phoneNumber: {
      required,
      numeric,
      phone
    },
    email: {
      email
    },
    lastName: {
      required,
      minLength: minLength(6)
    },
    firstName: {
      required,
      minLength: minLength(3)
    },
    middleName: {
      required,
      minLength: minLength(6)
    },
    specialization: {
      required,
      minLength: minLength(3)
    }
  }
}
</script>
