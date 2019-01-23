<template>
  <div class="form-group">
    <label  :for="id"> 
      {{ labelText || '' }}
    </label>
    <input  class="form-control"
            :class="{ 'input-error' : inputError}"
            :id="id"
            :type="type || 'text'"    
            :placeholder="placeholder || ''"
            :autofocus="autofocus"
            :value="value"
            v-on="inputListeners"
    />

    <div  class='feedback'
          :class="{ invisible: !inputError }">
      {{ inputError }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    value: String,
    id: String,
    type: String,
    placeholder: String,
    autofocus: Boolean,
    labelText: String,
    inputError: String
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit("input", event.target.value),
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../assets/variables"

.invisible
  opacity: 0

.form-group
  background-color: inherit
  label
    font-size: 16px
    font-weight: 500
    color: $auth_form_label_text_color
    background-color: inherit
    display: block
    height: 17px
    margin-bottom: 7px
  .feedback
    font-size: 13px
    font-weight: 400
    max-width: 100%
    color: $auth_form_alert_color
    line-height: 17px
    height: 15px
    display: block
    text-align: right
    background-color: inherit
  input
    background-color: $input_background_color
    color: $input_text_color
    padding: 8px 16px
    width: 100%
    font-size: 15px
    height: 40px
    border: 1px solid $input_border_color 
    box-sizing: border-box
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1)
    border-radius: 5px
    &:focus
      outline: none
      box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.4)
    &.input-error
      background-color: $input_background_color
      border-color: $auth_form_alert_color
</style>
