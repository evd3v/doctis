<template>
  <div class="admin">
    <div class="user-card">
      <div class="user-card-content container">
        <div class="user-card-left">
          <button class="back-btn">
            <font-awesome-icon icon="long-arrow-alt-left" />
          </button>
        </div>
        <div class="user-card-right">
          <div class="title">
            <strong>{{ getAdmin.lastName }}</strong>
            {{ `${getAdmin.firstName} ${getAdmin.middleName}` }}
          </div>
          <div class="role">
            Администратор
          </div>
        </div>
      </div>
    </div>
    <div class="search">
      <div class="search-content container">
        <div class="title">Администратор</div>
        <input type="text" placeholder="Поиск пациента" />
      </div>
    </div>
    <div class="main-panel">
      <div class="main-panel-header container">
        <button class="add-btn" @click="$refs.CreateDoctorModal.onShow()">
          <font-awesome-icon icon="plus" />
        </button>
        <div class="title">Зарегистрировать нового врача</div>
      </div>
      <div class="accordion" role="tablist">
        <b-card
          no-body
          class="accordion-item"
          v-for="(patient, index) in getPatients"
          :key="index"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              class="accordion-item-toggle container"
              block
              href="#"
              v-b-toggle="`accordion-${index}`"
            >
              <span class="accordion-item-toggle-icon">$</span>
              <div class="name">
                <span class="doctor-name">{{
                  getFullNameDoctor(patient.doctor)
                }}</span>
                <span class="patient-name">{{ patient.firstFIO }}</span>
              </div>
              <div class="status">
                <span class="status-title">
                  {{ steps[patient.step - 1].title }}
                </span>
                <span class="status-id">ID: {{ patient.patientId }}</span>
              </div>
              <span class="arrow">
                <font-awesome-icon icon="chevron-down"
              /></span>
            </b-button>
          </b-card-header>
          <b-collapse
            :id="`accordion-${index}`"
            accordion="accordion"
            role="tabpanel"
          >
            <div class="accordion-content container">
              <div class="patient-name">{{ patient.lastFIO }}</div>
              <div class="doctor-name">
                <span class="doctor-name-title">Врач:</span>
                <span class="doctor-name-value">{{
                  getFullNameDoctor(patient.doctor)
                }}</span>
              </div>
              <ul class="info-list">
                <li class="info-list-item">
                  <span class="info-list-key">ID:</span>
                  <span class="info-list-value">{{ patient.patientId }}</span>
                </li>
                <li class="info-list-item">
                  <span class="info-list-key">Телефон:</span>
                  <span class="info-list-value">{{ patient.phoneNumber }}</span>
                </li>
                <li class="info-list-item">
                  <span class="info-list-key">Город:</span>
                  <span class="info-list-value">{{ patient.city }}</span>
                </li>
                <li class="info-list-item">
                  <span class="info-list-key">Пол:</span>
                  <span class="info-list-value">{{ patient.male }}</span>
                </li>
                <li class="info-list-item">
                  <span class="info-list-key">Возраст:</span>
                  <span class="info-list-value">{{ patient.age }}</span>
                </li>
                <li class="info-list-item">
                  <span class="info-list-key">Диагноз:</span>
                  <span class="info-list-value">{{ patient.disease }}</span>
                </li>
                <li class="info-list-item">
                  <span class="info-list-key">Направлен:</span>
                  <span class="info-list-value">{{ patient.clinic }}</span>
                </li>
              </ul>
              <ul class="status-list">
                <li
                  class="status-list-item"
                  v-for="(step, index) in steps"
                  :key="index"
                >
                  <div class="status-icon-wrapper">
                    <span :class="getStatusClasses(patient.step, index)">
                      <font-awesome-icon icon="check"
                    /></span>
                  </div>
                  <div class="status-text">
                    <span class="title">
                      {{ step.title }}
                    </span>
                    <span class="description">
                      hello
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </b-collapse>
        </b-card>
      </div>
    </div>
    <CreateDoctorModal ref="CreateDoctorModal" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import CreateDoctorModal from "./CreateDoctorModal"

export default {
  name: "Admin",
  components: { CreateDoctorModal },
  data() {
    return {
      steps: [
        {
          title: "Пациент добавлен в систему"
        },
        {
          title: "Записан на онлайн консультацию"
        },
        {
          title: "Консультация в Доктис"
        },
        {
          title: "Направлен на очную консультацию"
        },
        {
          title: "Услуги оказаны"
        },
        {
          title: "Вознаграждение выплачено"
        }
      ]
    }
  },
  computed: {
    ...mapGetters(["getAdmin", "getPatients"])
  },
  mounted() {
    setTimeout(async () => {
      await this.$store.dispatch("fetchAdminProfile")
      await this.$store.dispatch("fetchPatients")
    }, 500)
  },
  methods: {
    getFullNameDoctor(doctor) {
      return `${doctor.lastName}
      ${doctor.firstName.slice(0, 1)}.
      ${doctor.middleName.slice(0, 1)}.`
    },
    getStatusClasses(step, index) {
      let resultClass = "status-icon"
      if (index < step - 1) {
        resultClass += " done"
      }
      if (step - 1 === index) {
        resultClass += " active"
      }
      return resultClass
    }
  }
}
</script>
