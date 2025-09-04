<script setup>
defineProps({
  type: String,
  title: String,
  subTitle: String,
  category: String,
  color: String,
  description: String,
  noFooterLine: Boolean,
  plain: Boolean,
  raised: Boolean,
  cardBodyClasses: [String, Object, Array],
  headerClasses: [String, Object, Array]
})
</script>

<template>
  <div
      class="card"
      :class="[
      {
        'bg-white shadow-lg rounded-xl': !plain && raised,
        'bg-transparent': plain,
        'border border-gray-200 rounded-lg': plain,
        'card-primary': type === 'primary',
        'card-secondary': type === 'secondary',
        'card-success': type === 'success',
        'card-danger': type === 'danger',
        'card-warning': type === 'warning',
        'card-info': type === 'info'
      }
    ]"
      :style="color ? { backgroundColor: color } : {}"
  >
    <h6 class="card-category" v-if="$slots.category || category">
      <slot name="category">{{ category }}</slot>
    </h6>

    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>

    <div class="card-avatar" v-if="$slots.avatar">
      <slot name="avatar"></slot>
    </div>

    <div class="info" v-if="$slots.info">
      <slot name="info"></slot>
    </div>

    <div
        class="card-header"
        :class="headerClasses"
        v-if="$slots.header || title || subTitle || description"
    >
      <slot name="header">
        <h1 v-if="title" class="card-title">{{ title }}</h1>
        <h3 v-if="subTitle" class="card-category">{{ subTitle }}</h3>
        <p v-if="description" class="card-description">{{ description }}</p>
      </slot>
    </div>

    <div v-if="$slots.default" class="card-body" :class="cardBodyClasses">
      <slot></slot>
    </div>

    <slot name="raw-content"></slot>

    <hr v-if="$slots.footer && !noFooterLine" class="my-4 border-gray-200" />

    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply overflow-hidden transition-all duration-300;
}

.card-primary {
  @apply bg-blue-50 border-blue-200;
}

.card-secondary {
  @apply bg-purple-50 border-purple-200;
}

.card-success {
  @apply bg-green-50 border-green-200;
}

.card-danger {
  @apply bg-red-50 border-red-200;
}

.card-warning {
  @apply bg-yellow-50 border-yellow-200;
}

.card-info {
  @apply bg-cyan-50 border-cyan-200;
}

.card-category {
  @apply text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2;
}

.card-image {
  @apply w-full;
}

.card-image img {
  @apply w-full object-cover;
}

.card-avatar {
  @apply flex justify-center -mt-12 mb-4;
}

.card-avatar img {
  @apply w-20 h-20 rounded-full border-4 border-white shadow-lg;
}

.info {
  @apply p-4 text-center;
}

.card-header {
  @apply px-6 pt-6 pb-2 text-center;
}

.card-title {
  @apply text-xl font-bold text-gray-800 mb-1;
}

.card-description {
  @apply text-gray-600 mt-2;
}

.card-body {
  @apply px-6 py-4;
}

.card-footer {
  @apply px-6 pb-6 pt-2;
}
</style>