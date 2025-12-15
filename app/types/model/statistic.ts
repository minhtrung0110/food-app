import type { Component } from 'vue'

export interface StatItem {
  id: number
  title: string
  content?: string
  amount?: number
  type?: 'increase' | 'decrease'
  description?: string
  icon: Component
}
