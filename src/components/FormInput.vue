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
            :value="value"
            v-on="inputListeners">

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
    labelText: String,
    inputError: String
  },
  computed: {
    inputListeners() {
      const vm = this;
      return {
        ...this.$listeners,
        input(event) {
          vm.$emit("input", event.target.value);
        }
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../assets/variables"

*
  box-sizing: border-box

.invisible
      opacity: 0

.form-group
  background-color: inherit
  label
    font-size: 16px
    font-weight: 500
    color: $dark_background_color
    background-color: inherit
    display: block
    height: 17px
    margin-bottom: 7px
  .feedback
    font-size: 13px
    font-weight: 400
    max-width: 100%
    color: $base_alert_color
    line-height: 15px
    height: 15px
    display: block
    text-align: right
    background-color: inherit
  input
    background-color: $text_background_color
    color: $base_font_color
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
      background-color: $text_background_color
      border-color: $base_alert_color
</style>
