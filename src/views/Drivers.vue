<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-card class="mx-auto">
          <v-card-title
            ><v-col class="d-flex">
              <span>Motoristas</span>
            </v-col>

            <v-col class="d-flex"
              ><v-text-field
                type="text"
                v-model="search"
                placeholder="Pesquisar"
                outlined
                class="mr-4"
                single-line
              ></v-text-field>
              <v-btn color="amber" x-large @click.prevent="newDriver()"
                >Novo</v-btn
              >
            </v-col>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="drivers"
              no-data-text="Sem registros para exibir."
              no-results-text="Nenhum registro encontrado."
              :search="search"
            >
              <template v-slot:item.phone="{ item }">
                {{ item.phone | phone }}
              </template>
              <template v-slot:item.birthdate="{ item }">
                {{ item.birthdate | brDate }}
              </template>
              <template v-slot:item.cpf="{ item }">
                {{ item.cpf | cpf }}
              </template>
              <template v-slot:item.cnh_type="{ item }">
                <v-chip color="success">{{ item.cnh_type }}</v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon small>
                  <v-icon small @click.prevent="editDriver(item)"
                    >mdi-pencil</v-icon
                  >
                </v-btn>
                <v-btn icon small>
                  <v-icon small @click.prevent="deleteDriver(item)"
                    >mdi-delete</v-icon
                  >
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  data() {
    return {
      headers: [
        {
          text: "Nome",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Telefone",
          align: "left",
          sortable: false,
          value: "phone"
        },
        {
          text: "Data de Nascimento",
          align: "left",
          sortable: true,
          value: "birthdate"
        },
        {
          text: "CPF",
          align: "left",
          sortable: false,
          value: "cpf"
        },
        {
          text: "CNH",
          align: "left",
          sortable: false,
          value: "cnh"
        },
        {
          text: "Tipo CNH",
          align: "center",
          sortable: true,
          value: "cnh_type"
        },
        {
          text: "Ações",
          align: "center",
          sortable: false,
          value: "actions"
        }
      ],
      search: ""
    };
  },
  methods: {
    newDriver() {
      this.$router.push("/drivers/new");
    },
    editDriver(driver) {
      this.$router.push(`/drivers/${driver._id}`);
    },
    deleteDriver(driver) {
      this.$store.dispatch("removeDriver", driver._id);
    }
  },
  computed: {
    drivers() {
      return this.$store.getters.drivers;
    }
  },
  filters: {
    phone: function(phone) {
      if (!phone) return "";
      switch (phone.length) {
        case 10:
          return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(
            6
          )}`;
        case 11:
          return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(
            3,
            7
          )}-${phone.slice(7)}`;
      }
    },
    brDate: function(date) {
      if (!date) return "";
      let [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    cpf: function(cpf) {
      if (!cpf || cpf.length < 11) return "";
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
        6,
        9
      )}-${cpf.slice(9)}`;
    }
  },
  mounted() {
    this.$store.dispatch("fetchDrivers");
  }
};
</script>
