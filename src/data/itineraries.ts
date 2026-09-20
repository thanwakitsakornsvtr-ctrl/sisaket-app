// Day plans built by clustering existing attractions.ts entries by
// district/route — not a new, separately-sourced dataset.
export interface Itinerary {
  id: string
  title: string
  days: number
  summary: string
  stops: { attractionId: string; note: string }[]
}

export const itineraries: Itinerary[] = [
  {
    id: 'one-day-heritage',
    title: 'หนึ่งวันเต็ม สายปราสาทขอมและพระธาตุกลางเมือง',
    days: 1,
    summary: 'เหมาะสำหรับทริปสั้น ๆ วนอยู่ในอำเภอเมืองและอุทุมพรพิสัย ระยะทางรวมไม่ถึง 50 กม.',
    stops: [
      {
        attractionId: 'wat-phra-that-rueang-rong',
        note: 'เริ่มเช้าที่พระธาตุเรืองรอง ใกล้ตัวเมือง ไหว้พระขอพรก่อนออกเดินทาง',
      },
      {
        attractionId: 'sa-kamphaeng-yai',
        note: 'เดินทางต่อไปอำเภออุทุมพรพิสัย ชมปราสาทขอมแบบบาปวนที่ใหญ่และสมบูรณ์ที่สุดของจังหวัด',
      },
      {
        attractionId: 'sa-kamphaeng-noi',
        note: 'ปิดท้ายที่ปราสาทสระกำแพงน้อยซึ่งอยู่ใกล้กัน อดีตอโรคยาศาลสมัยพระเจ้าชัยวรมันที่ 7',
      },
    ],
  },
  {
    id: 'two-day-nature-heritage',
    title: 'สองวันหนึ่งคืน ธรรมชาติและวัฒนธรรมชายแดน',
    days: 2,
    summary: 'วันแรกวนแถบปราสาทขอม พักค้างในตัวเมือง วันที่สองมุ่งหน้าเขาพระวิหารและอำเภอขุนหาญ',
    stops: [
      {
        attractionId: 'sa-kamphaeng-yai',
        note: 'วันแรก เริ่มจากปราสาทสระกำแพงใหญ่ในอำเภออุทุมพรพิสัย',
      },
      {
        attractionId: 'sa-kamphaeng-noi',
        note: 'แวะปราสาทสระกำแพงน้อยที่อยู่ใกล้กัน ก่อนกลับเข้าเมืองพักค้างคืน',
      },
      {
        attractionId: 'pha-mor-e-daeng',
        note: 'วันที่สอง ออกเดินทางแต่เช้าไปอำเภอกันทรลักษ์ (ราว 98 กม.) ชมทะเลหมอกที่ผามออีแดง',
      },
      {
        attractionId: 'wat-lan-khuad',
        note: 'ระหว่างทางกลับ แวะอำเภอขุนหาญ ชมวัดล้านขวดที่สร้างจากขวดแก้วกว่า 1.5 ล้านใบ',
      },
    ],
  },
]
