<script setup>
import { ref, computed, provide, watch, onMounted, nextTick, inject, onBeforeUnmount } from 'vue'

// Tab Pane Component Props
const tabPaneProps = defineProps({
  label: String,
  id: String,
  disabled: Boolean
})

// Tab Pane Component State
const active = ref(false)
const addTab = inject('addTab', null)
const removeTab = inject('removeTab', null)

// Tab Pane Lifecycle
onMounted(() => {
  if (addTab) {
    addTab({
      label: tabPaneProps.label,
      id: tabPaneProps.id,
      disabled: tabPaneProps.disabled,
      active: active.value,
      setActive: (value) => { active.value = value }
    })
  }
})

onBeforeUnmount(() => {
  if (removeTab) {
    removeTab({
      label: tabPaneProps.label,
      id: tabPaneProps.id
    })
  }
})

// Tabs Component Props
const tabsProps = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: value => {
      let acceptedValues = [
        'primary',
        'info',
        'success',
        'warning',
        'danger',
        'default',
        'neutral'
      ]
      return acceptedValues.indexOf(value) !== -1
    }
  },
  modelValue: {
    type: String,
    default: ''
  },
  tabNavWrapperClasses: {
    type: [String, Object],
    default: ''
  },
  tabNavClasses: {
    type: [String, Object],
    default: ''
  },
  tabContentClasses: {
    type: [String, Object],
    default: ''
  },
  vertical: Boolean,
  noContentSpace: Boolean,
  icons: Boolean,
  centered: Boolean,
  pills: Boolean
})

// Tabs Component Emits
const emit = defineEmits(['update:modelValue'])

// Tabs Component State
const tabs = ref([])

// Tabs Component Computed
const tabTypeClass = computed(() => {
  let baseClass = tabsProps.pills ? 'pills' : 'tabs'
  if (tabsProps.type && tabsProps.type !== 'default') {
    return `nav-${baseClass}-${tabsProps.type}`
  }
  return ''
})

// Tabs Component Methods
function addTabToTabs(tab) {
  tabs.value.push(tab)

  // Activate first tab if no active tab
  if (tabs.value.length === 1 && !tabsProps.modelValue) {
    activateTab(tab)
  }

  // Activate tab if it matches the modelValue
  if (tabsProps.modelValue && (tab.label === tabsProps.modelValue || tab.id === tabsProps.modelValue)) {
    activateTab(tab)
  }
}

function removeTabFromTabs(tabToRemove) {
  const index = tabs.value.findIndex(tab => tab.label === tabToRemove.label && tab.id === tabToRemove.id)
  if (index > -1) {
    tabs.value.splice(index, 1)
  }
}

function findAndActivateTab(label) {
  let tabToActivate = tabs.value.find(t => t.label === label || t.id === label)
  if (tabToActivate) {
    activateTab(tabToActivate)
  }
}

function activateTab(tab) {
  if (tab.disabled) {
    return
  }

  // Deactivate all tabs
  tabs.value.forEach(t => {
    if (t.setActive) {
      t.setActive(false)
    }
  })

  // Activate the selected tab
  if (tab.setActive) {
    tab.setActive(true)
  }

  emit('update:modelValue', tab.label || tab.id)
}

function deactivateTabs() {
  tabs.value.forEach(tab => {
    if (tab.setActive) {
      tab.setActive(false)
    }
  })
}

// Provide functions to child components
provide('addTab', addTabToTabs)
provide('removeTab', removeTabFromTabs)

// Tabs Component Lifecycle
onMounted(() => {
  nextTick(() => {
    if (tabsProps.modelValue) {
      findAndActivateTab(tabsProps.modelValue)
    }
  })
})

// Tabs Component Watchers
watch(() => tabsProps.modelValue, (newVal) => {
  findAndActivateTab(newVal)
})
</script>

<template>
  <!-- Tab Pane Template -->
  <div
      v-if="!$slots.default"
      class="tab-pane"
      v-show="active"
      :id="tabPaneProps.id || tabPaneProps.label"
      :class="{ active: active }"
      :aria-expanded="active"
  >
    <slot></slot>
  </div>

  <!-- Tabs Template -->
  <div v-else :class="{ 'flex': tabsProps.vertical, 'block': !tabsProps.vertical }">
    <div
        :class="[
        { 'w-1/4 pr-4': tabsProps.vertical && !tabsProps.tabNavWrapperClasses },
        { 'flex justify-center': tabsProps.centered && !tabsProps.tabNavWrapperClasses },
        tabsProps.tabNavWrapperClasses
      ]"
    >
      <ul
          class="nav"
          role="tablist"
          :class="[
          tabTypeClass,
          { 'flex flex-col': tabsProps.vertical },
          { 'flex justify-center': tabsProps.centered },
          { 'nav-pills': tabsProps.pills },
          { 'nav-tabs border-b border-gray-200': !tabsProps.pills },
          { 'items-center': tabsProps.icons },
          tabsProps.tabNavClasses
        ]"
      >
        <li
            v-for="tab in tabs"
            class="nav-item"
            :key="tab.id || tab.label"
        >
          <a
              :href="`#${tab.id || tab.label}`"
              @click.prevent="activateTab(tab)"
              :aria-expanded="tab.active"
              class="nav-link px-4 py-2 block transition-colors duration-200"
              :class="[
              {
                'active bg-blue-500 text-white': tab.active && tabsProps.pills,
                'active border-b-2 border-blue-500 text-blue-600': tab.active && !tabsProps.pills,
                'text-gray-600 hover:text-gray-800': !tab.active && !tabsProps.pills,
                'text-gray-600 hover:bg-gray-100 rounded-lg': !tab.active && tabsProps.pills,
                'opacity-50 cursor-not-allowed': tab.disabled,
                'flex items-center': tabsProps.icons
              }
            ]"
          >
            <slot name="label" :tab="tab">
              {{ tab.label }}
            </slot>
          </a>
        </li>
      </ul>
    </div>
    <div
        class="tab-content"
        :class="[
        { 'mt-4': !tabsProps.vertical && !tabsProps.noContentSpace },
        { 'w-3/4': tabsProps.vertical && !tabsProps.tabContentClasses },
        tabsProps.tabContentClasses
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>