<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-card class="mx-auto" width="800">
          <v-card-title>Novo motorista</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Nome"
                    color="amber"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Telefone"
                    color="amber"
                    outlined
                    v-mask="['(##) ####-####', '(##) #####-####']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Data de nascimento"
                    color="amber"
                    outlined
                    v-mask="'##/##/####'"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Registro CNH"
                    color="amber"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    :items="cnh_types"
                    label="Tipo de CNH"
                    color="amber"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="CPF"
                    color="amber"
                    outlined
                    v-mask="'###.###.###-##'"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" class="d-flex flex-row-reverse">
                  <v-btn color="amber">Salvar</v-btn>
                </v-col>
              </v-row>
            </v-form>
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
      cnh_types: ["A", "B", "C", "D", "E", "AB", "AC", "AD", "AE"]
    };
  }
};
</script>
