<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card class="mx-auto" width="800">
        <v-card-title>{{ form_title }}</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Nome"
                  color="amber"
                  outlined
                  ref="name"
                  v-model="driver_data.name"
                  :rules="[validation_rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Telefone"
                  color="amber"
                  outlined
                  ref="phone"
                  v-model.lazy="driver_data.phone"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  :rules="[validation_rules.required, validation_rules.phone]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Data de nascimento"
                  color="amber"
                  outlined
                  ref="birthdate"
                  v-model.lazy="driver_data.birthdate"
                  v-mask="'##/##/####'"
                  :rules="[validation_rules.required, validation_rules.date]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Registro CNH"
                  color="amber"
                  outlined
                  ref="cnh"
                  v-model="driver_data.cnh"
                  :rules="[validation_rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  :items="cnh_types"
                  label="Tipo de CNH"
                  color="amber"
                  outlined
                  ref="cnh_type"
                  v-model="driver_data.cnh_type"
                  :rules="[validation_rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="CPF"
                  color="amber"
                  outlined
                  ref="cpf"
                  v-model.lazy="driver_data.cpf"
                  v-mask="'###.###.###-##'"
                  :rules="[validation_rules.required, validation_rules.cpf]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="d-flex flex-row-reverse">
                <v-btn color="amber" @click.prevent="saveDriver()">{{
                  $route.path === "/drivers/edit" ? "Atualizar" : "Salvar"
                }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mask } from "vue-the-mask";
import moment from "moment";
import {
  formatToPhone,
  formatToDate,
  formatToCPF,
  isDate,
  isCPF,
  isPhone
} from "brazilian-values";

export default {
  data() {
    return {
      cnh_types: ["A", "B", "C", "D", "E", "AB", "AC", "AD", "AE"],
      driver_data: {
        _id: "",
        name: "",
        phone: "",
        birthdate: "",
        cnh: "",
        cnh_type: "",
        cpf: ""
      },
      validation_rules: {
        required: value => !!value || "Campo obrigatório.",
        date: value => !!isDate(value) || "Data inválida.",
        cpf: value => !!isCPF(value) || "CPF inválido.",
        phone: value => !!isPhone(value) || "Telefone inválido"
      }
    };
  },
  methods: {
    saveDriver() {
      this.formErrors = false;
      Object.keys(this.form).forEach(field => {
        if (!this.form[field]) this.formErrors = true;
        this.$refs[field].validate(true);
      });

      if (this.formErrors) {
        return;
      }
      let payload = {
        name: this.driver_data.name,
        phone: this.driver_data.phone.replace(/[() -]/g, ""),
        birthdate: this.parseBirthdate(this.driver_data.birthdate),
        cnh: this.driver_data.cnh,
        cnh_type: this.driver_data.cnh_type,
        cpf: this.driver_data.cpf.replace(/[.-]/g, ""),
        active: true
      };
      console.log("Save driver route", this.$route.name);
      if (this.$route.name === "EditDriver") {
        Object.assign(payload, { _id: this.driver_data._id });
        this.$store.dispatch("updateDriver", payload).then(replaced_docs => {
          this.$router.push("/drivers");
        });
      } else {
        this.$store.dispatch("newDriver", payload).then(data => {
          this.$router.push("/drivers");
        });
      }
    },
    parseBirthdate(date) {
      if (!date) return "";
      let [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`;
    }
  },
  computed: {
    form() {
      return {
        name: this.driver_data.name,
        phone: this.driver_data.phone,
        birthdate: this.driver_data.birthdate,
        cnh: this.driver_data.cnh,
        cnh_type: this.driver_data.cnh_type,
        cpf: this.driver_data.cpf
      };
    },
    form_title() {
      return this.$route.name == "EditDriver"
        ? "Atualizar motorista"
        : "Novo motorista";
    }
  },
  directives: {
    mask
  },
  beforeMount() {
    if (this.$route.name === "EditDriver") {
      this.$store
        .dispatch("getDriver", this.$route.params.id)
        .then(data => {
          this.driver_data._id = data._id;
          this.driver_data.name = data.name;
          this.driver_data.phone = formatToPhone(data.phone);
          this.driver_data.birthdate = moment(data.birthdate).format(
            "DD/MM/YYYY"
          );
          this.driver_data.cnh = data.cnh;
          this.driver_data.cnh_type = data.cnh_type;
          this.driver_data.cpf = formatToCPF(data.cpf);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return;
    }
  }
};
</script>
