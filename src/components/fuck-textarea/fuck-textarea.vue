<template>
  <view>
    <view
      class="fuck-textarea-edit-content"
      :class="{ hidden: EditMode, border: border }"
      :style="[getStyle]"
      @tap="TapView"
    >
      {{ Content }}
    </view>
    <textarea
      class="fuck-textarea-edit-content"
      :class="{ hidden: !EditMode, border: border }"
      :style="[getStyle]"
      :value="value"
      :maxlength="maxlength == '' ? -1 : maxlength"
      :show-confirm-bar="false"
      :disabled="disabled"
      :focus="EditMode"
      :placeholder="placeholder"
      @blur="EditBlur"
      @input="handleInput"
    />
    <view v-if="maxlength != '' && maxlength >= 0" class="inputlength">
      <text class="current">{{ CurrentLength }}</text
      ><text style="margin: 0 6rpx">/</text><text>{{ maxlength }}</text>
    </view>
  </view>
</template>

<script>
import { debounce } from '@/utils/tools'

export default {
  name: 'FuckTextarea',
  props: {
    width: {
      type: String,
      default: 'calc(100% - 40rpx)',
    },
    height: {
      type: String,
      default: '200rpx',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    customStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [Number, String],
      default: -1,
    },
  },
  data() {
    return {
      Content: '',
      EditMode: true,
      ShowBorder: true,
    }
  },
  computed: {
    CurrentLength() {
      return this.Content.length
    },
    getStyle() {
      let style = {
        height: `${this.height}`,
        width: `${this.width}`,
      }
      style.pointerEvents = this.disabled ? 'none' : 'auto'
      style = Object.assign(style, this.customStyle)
      return style
    },
  },
  watch: {
    value(v) {
      this.Content = v
    },
  },
  mounted() {
    this.Content = this.value
  },
  methods: {
    TapView() {
      this.EditMode = true
    },
    EditBlur(e) {
      this.EditMode = false
      this.Content = e.target.value
      this.$emit('input', this.Content)
    },
    handleInput(e) {
      this.Content = e.target.value // 更新 Content
    },
  },
}
</script>

<style>
.hidden {
  display: none;
}

.fuck-textarea-edit-content {
  padding: 20rpx;
  font-size: 28rpx;
  line-height: 1.6em;
  white-space: pre-wrap;
  text-align: justify;
  text-justify: inter-ideograph;
  overflow-y: scroll;
}

.fuck-textarea-edit-content.border {
  border: 2rpx solid #dddddd;
}

.inputlength {
  font-size: 26rpx;
  padding: 10rpx;
  text-align: right;
  color: #000000;
}

.inputlength .current {
  color: #999999;
}
</style>
