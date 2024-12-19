import type { Exhibition } from '@/types/strapi'

export const useExhibitions = (exhibitions: Exhibition[]) => {
    const exhibitionsLoaded = ref(exhibitions)

    exhibitionsLoaded.value.forEach((exhibition) => {
        const link = exhibition.querySelector('[data-name="exhibition_link"]')
        const cover = link.querySelector('[data-name="exhibition_cover"]')

        const handleMouseMove = (e: MouseEvent) => {
            const rect = link.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            cover.style.transform = `translate(${x}px, ${y}px)`
            cover.style.zIndex = '9999'
        }

        link.addEventListener('mouseenter', () => {
            cover.style.opacity = '1'
            link.addEventListener('mousemove', handleMouseMove)
        })

        link.addEventListener('mouseleave', () => {
            cover.style.opacity = '0'
            link.removeEventListener('mousemove', handleMouseMove)
        })
    })
}
