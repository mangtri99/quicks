<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger
} from 'radix-vue'
import IconCalendar from './icons/IconCalendar.vue'
import { ref, watchEffect, type Ref } from 'vue'
import { parseDate, type DateValue } from '@internationalized/date'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const createDate = (defaultDate: string) => {
  const date = parseDate(defaultDate)
  return date
}
const dateModel = ref(createDate(props.modelValue as string)) as Ref<DateValue>

watchEffect(() => {
  emit('update:modelValue', dateModel.value)
})
</script>

<template>
  <DatePickerRoot v-model="dateModel" id="date-field">
    <DatePickerField
      v-slot="{ segments }"
      class="flex select-none bg-white items-center justify-between rounded-lg text-center text-green10 border border-transparent p-1 w-40 data-[invalid]:border-red-500"
    >
      <div class="flex items-center">
        <template v-for="item in segments" :key="item.part">
          <DatePickerInput v-if="item.part === 'literal'" :part="item.part">
            {{ item.value }}
          </DatePickerInput>
          <DatePickerInput
            v-else
            :part="item.part"
            class="rounded-md p-0.5 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-primary-300 data-[placeholder]:text-green9"
          >
            {{ item.value }}
          </DatePickerInput>
        </template>
      </div>

      <DatePickerTrigger
        class="focus:shadow-[0_0_0_2px] rounded-md text-xl p-1 focus:shadow-primary-300"
      >
        <IconCalendar />
      </DatePickerTrigger>
    </DatePickerField>

    <DatePickerContent :side-offset="4" class="bg-white shadow-lg rounded-xl">
      <DatePickerArrow class="fill-white" />
      <DatePickerCalendar v-slot="{ weekDays, grid }" class="p-4">
        <DatePickerHeader class="flex items-center justify-between">
          <DatePickerPrev
            class="inline-flex items-center cursor-pointer text-primary-300 justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-primary-300 hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-primary-300"
          >
            <Icon icon="radix-icons:chevron-left" class="w-6 h-6" />
          </DatePickerPrev>

          <DatePickerHeading class="font-medium text-primary-300" />
          <DatePickerNext
            class="inline-flex items-center cursor-pointer text-primary-300 justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-primary-300 hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-primary-300"
          >
            <Icon icon="radix-icons:chevron-right" class="w-6 h-6" />
          </DatePickerNext>
        </DatePickerHeader>
        <div class="flex flex-col pt-4 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <DatePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full space-y-1 border-collapse select-none"
          >
            <DatePickerGridHead>
              <DatePickerGridRow class="flex justify-between w-full mb-1">
                <DatePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="w-8 text-xs rounded-md text-green8"
                >
                  {{ day }}
                </DatePickerHeadCell>
              </DatePickerGridRow>
            </DatePickerGridHead>
            <DatePickerGridBody>
              <DatePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="flex w-full"
              >
                <DatePickerCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                >
                  <DatePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative flex items-center justify-center whitespace-nowrap rounded-[9px] border border-transparent bg-transparent text-sm font-normal text-primary-300 w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-primary-300 hover:border-black data-[selected]:bg-primary-300 data-[selected]:font-medium data-[disabled]:text-primary-300/30 data-[selected]:text-white data-[unavailable]:pointer-events-none data-[unavailable]:text-primary-300/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9 data-[selected]:before:bg-white"
                  />
                </DatePickerCell>
              </DatePickerGridRow>
            </DatePickerGridBody>
          </DatePickerGrid>
        </div>
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePickerRoot>
</template>
