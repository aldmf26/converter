// composables/useArmhole.ts
import { computed, ref, type Ref } from 'vue'

export function useArmhole(armholeInput: Ref<string | number | null | undefined>) {
  const armhole = computed(() => {
    const val = Number(armholeInput.value)
    return isNaN(val) ? 0 : val
  })

  // Format angka: hilangkan .00 jika integer
  const formatNumber = (num: number): number => {
    if (num === 0) return 0
    return parseFloat(num.toFixed(2))
  }

  const tp = computed(() => formatNumber(armhole.value / 4))
  const bisep = computed(() => formatNumber(armhole.value / 2))
  const kerung = computed(() => formatNumber(bisep.value / 4))

  const hasResult = computed(() => armhole.value > 0)

  return {
    armhole,
    tp,
    bisep,
    kerung,
    hasResult,
    formatNumber,
  }
}