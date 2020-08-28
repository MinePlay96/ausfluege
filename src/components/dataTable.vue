<template>
  <div>
    <b-table sticky-header :items="data" :fields="fields">
      <template v-slot:head(actions)="header"
        >{{ header.label
        }}<b-button v-b-modal.modal-1 class="ml-1" size="sm" variant="success"
          ><b-icon-plus></b-icon-plus></b-button
      ></template>
      <template v-slot:cell(cost)="element"> {{ element.value }} € </template>
      <template v-slot:cell(lastVisited)="element">{{
        element.value | formatDate
      }}</template>
      <template v-slot:cell(travelTime)="element">{{
        element.value | formatTime
      }}</template>
      <template v-slot:cell(actions)="element">
        <b-button variant="warning" size="sm" class="mr-1"
          ><b-icon-gear-fill></b-icon-gear-fill
        ></b-button>
        <b-button
          variant="danger"
          size="sm"
          @click="deleteElement(element.index)"
          ><b-icon-trash-fill></b-icon-trash-fill
        ></b-button>
      </template>
    </b-table>
    <b-modal id="modal-1" ref="modal" @ok="handleOk" title="Eintrag hinzufügen">
      <b-form id="form" ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name:" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="form.data.name"
            placeholder="Name eingeben"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Wetter:" label-for="input-weather">
          <b-form-input
            id="input-weather"
            v-model="form.data.weather"
            placeholder="Wetter eingeben"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Kosten:" label-for="input-cost">
          <b-form-input
            id="input-cost"
            v-model="form.data.cost"
            type="number"
            min="0"
            step=".01"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Zuletzt Besucht:" label-for="input-lastVisited">
          <b-form-input
            id="input-lastVisited"
            v-model="form.data.lastVisited"
            type="date"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Reise zeit:" label-for="input-travelTime">
          <b-form-input
            id="input-travelTime"
            v-model="form.data.travelTime"
            type="time"
            min="0"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Kategory:" label-for="input-category">
          <b-form-input
            id="input-category"
            v-model="form.data.category"
            placeholder="Kategory eingeben"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        data: {
          name: "",
          weather: "",
          cost: null,
          lastVisited: null,
          travelTime: null,
          category: "",
          state: true
        },
        state: {
          name: null,
          weather: null,
          cost: null,
          lastVisited: null,
          travelTime: null,
          category: null,
          state: true
        }
      },
      data: [
        {
          name: "Wilsederberg",
          weather: "Sonne",
          cost: 0,
          lastVisited: new Date("2020-08-21"),
          travelTime: 105,
          category: "Sport"
        },
        {
          name: "Hallenbad Lüneburg",
          weather: "Regen",
          cost: 13,
          lastVisited: new Date(null),
          travelTime: 21,
          category: "Schwimmen"
        },
        {
          name: "Minigolf",
          weather: "Sonne",
          cost: 4,
          lastVisited: new Date(null),
          travelTime: 5,
          category: "Aktivität"
        }
      ],
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true
        },
        {
          key: "weather",
          label: "Wetter",
          sortable: true
        },
        {
          key: "cost",
          label: "Kosten",
          sortable: true
        },
        {
          key: "lastVisited",
          label: "Letztes mal Besucht",
          sortable: true
        },
        {
          key: "travelTime",
          label: "Reise Zeit",
          sortable: true
        },
        {
          key: "category",
          label: "Kategorie",
          sortable: true
        },
        {
          key: "actions",
          label: "Actionen"
        }
      ]
    };
  },
  filters: {
    formatTime(time) {
      const hours = parseInt(time / 60);
      const minutes = time % 60;

      return (
        (hours ? hours + "h" : "") +
        (hours & minutes ? " " : "") +
        (minutes ? minutes + "min" : "")
      ).trim();
    },
    formatDate(date) {
      if (date.toISOString() == new Date(null).toISOString()) {
        return "Noch nicht Besucht";
      }
      return `${date.toLocaleDateString()}`;
    }
  },
  methods: {
    deleteElement(key) {
      const shoudDelete = confirm(`${this.data[key].name} wirklich Löschen`);
      if (shoudDelete) {
        this.data.splice(key, 1);
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.form.state = valid;
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      const newElement = {
        ...this.form.data,
        lastVisited: new Date(this.form.data.lastVisited)
      };

      const [hours, minutes] = this.form.data.travelTime.split(":");

      newElement.travelTime = hours * 60 + parseInt(minutes);

      this.data.push(newElement);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-1");
      });
    }
  }
};
</script>
