// Real, verifiable facts about this site's own data — never fabricated
// testimonials/reviews (no authentic visitor quotes exist for this project).
export interface TrustHighlight {
  id: string
  title: string
  description: string
  icon: 'gps' | 'source' | 'photo' | 'map'
}

export const trustHighlights: TrustHighlight[] = [
  {
    id: 'gps',
    title: 'พิกัด GPS แม่นยำ',
    description: 'ทุกสถานที่ระบุพิกัดละเอียดถึง 6 ตำแหน่งทศนิยม กดนำทางได้ทันทีผ่าน Google Maps',
    icon: 'gps',
  },
  {
    id: 'source',
    title: 'อ้างอิงแหล่งข้อมูลเปิดเผย',
    description: 'ข้อมูลประวัติและสถิติอ้างอิงจาก Wikipedia และปฏิทินวัฒนธรรม กระทรวงวัฒนธรรม ตรวจสอบย้อนกลับได้ทุกจุด',
    icon: 'source',
  },
  {
    id: 'photo',
    title: 'ภาพถ่ายลิขสิทธิ์เปิด',
    description: 'ภาพประกอบทั้งหมดมาจาก Wikimedia Commons ภายใต้สัญญาอนุญาตครีเอทีฟคอมมอนส์ พร้อมเครดิตผู้ถ่ายครบถ้วน',
    icon: 'photo',
  },
  {
    id: 'map',
    title: 'แผนที่จากชุมชนเปิด',
    description: 'ใช้ข้อมูลแผนที่จาก OpenStreetMap ซึ่งเป็นฐานข้อมูลแผนที่เปิดที่ชุมชนทั่วโลกช่วยกันปรับปรุงให้ทันสมัย',
    icon: 'map',
  },
]
