<template>
  <div class="form-group">
    <label  :for="id"
            :class="{ invisible: !value }"> 
      {{ labelText || '' }}
    </label>
    <input  class="form-control"
            :id="id"
            :type="type || 'text'"    
            :placeholder="placeholder || ''"
            :value="value"
            v-on="inputListeners">

    <div  class='feedback'
          :class="{ invisible: inputError === '' }">
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
*
  box-sizing: border-box
.invisible
      opacity: 0

.form-group
  label
    font-size: 13px
    font-weight: 400
    color: #50667b
    margin: 0
    max-width: 100%
  .feedback
    font-size: 13px
    font-weight: 400
    max-width: 100%
    color: #dc3545
    line-height: 15px
    height: 15px
  input
    background-color: rgba(164,175,221,.2)
    color: #50667b
    padding: 8px 16px
    width: 100%
    border-radius: 3px
    border: 1px solid transparent
    font-size: 15px
    height: 40px
    box-shadow: none
    &:focus
      background-color: #fff
      outline: none
      border: 1px solid #c6ccd1
      color: #2c2d30
    &.input-error
      border-color: #d74a5c
</style>
