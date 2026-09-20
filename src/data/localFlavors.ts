function commonsFilePath(fileName: string, width = 1200): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`
}

export interface LocalFlavor {
  id: string
  name: string
  category: 'ของกิน' | 'เทศกาล' | 'งานฝีมือ'
  image: string
  imageCredit: string
  description: string
  seasonNote?: string
  source: string
}

export const localFlavors: LocalFlavor[] = [
  {
    id: 'garlic',
    name: 'กระเทียมศรีสะเกษ',
    category: 'ของกิน',
    image: commonsFilePath('Allium_sativum_-_Garlic_-_01.jpg'),
    imageCredit: 'Wikimedia Commons',
    description:
      'กระเทียมศรีสะเกษได้รับการขึ้นทะเบียนสิ่งบ่งชี้ทางภูมิศาสตร์ (GI) จากกรมทรัพย์สินทางปัญญาเมื่อปี 2562 มีเอกลักษณ์คือเปลือกนอกสีขาวแกมม่วง เปลือกบาง หัวแน่น กลิ่นฉุน รสเผ็ดร้อน ปลูกในพื้นที่อำเภอเมืองศรีสะเกษ ราษีไศล ยางชุมน้อย กันทรารมย์ อุทุมพรพิสัย วังหิน และพยุห์',
    seasonNote: 'เก็บเกี่ยวช่วงเดือนมกราคม–มีนาคม',
    source: 'กรมทรัพย์สินทางปัญญา (ipthailand.go.th)',
  },
  {
    id: 'volcano-durian',
    name: 'ทุเรียนภูเขาไฟศรีสะเกษ',
    category: 'ของกิน',
    image: commonsFilePath('Durian_Bangkok.jpg'),
    imageCredit: 'Wikimedia Commons',
    description:
      'ปลูกในดินภูเขาไฟที่สลายตัวจากหินบะซอลต์ในอำเภอกันทรลักษ์ ขุนหาญ และศรีรัตนะ ดินอุดมแร่ธาตุทำให้เนื้อแน่น รสหวาน กลิ่นไม่ฉุนมาก ได้รับการขึ้นทะเบียนสิ่งบ่งชี้ทางภูมิศาสตร์ (GI) เช่นเดียวกับกระเทียม',
    seasonNote: 'ฤดูเก็บเกี่ยวช่วงเดือนมิถุนายน',
    source: 'อีสานอินไซต์ (isaninsight.kku.ac.th), THAILAND.GO.TH',
  },
  {
    id: 'lamduan-festival',
    name: 'เทศกาลดอกลำดวนบาน สืบสานประเพณีสี่เผ่าไทยศรีสะเกษ',
    category: 'เทศกาล',
    image: commonsFilePath('Melodorum_fruticosum.jpg'),
    imageCredit: 'Wikimedia Commons',
    description:
      'งานวัฒนธรรมประจำปีของจังหวัด จัดขึ้นที่สวนสมเด็จพระศรีนครินทร์ศรีสะเกษ อำเภอเมือง นำเสนอศิลปวัฒนธรรมและภูมิปัญญาของ 4 กลุ่มชาติพันธุ์ในจังหวัด ได้แก่ ลาว เขมร กูย และเยอ ผ่านการแสดง ขบวนแห่ และตลาดสินค้าท้องถิ่น',
    seasonNote: 'จัดเป็นประจำทุกปีช่วงเดือนมีนาคม (ปี 2568 จัดวันที่ 12–16 มี.ค.)',
    source: 'ปฏิทินวัฒนธรรม กระทรวงวัฒนธรรม (calendar.m-culture.go.th)',
  },
  {
    id: 'silk-luk-kaew',
    name: 'ผ้าไหมลายลูกแก้ว',
    category: 'งานฝีมือ',
    image: commonsFilePath('Thai_Silk_Weaving_3_-_Ban_Tha_Sawang.jpg'),
    imageCredit: 'Wikimedia Commons (ภาพประกอบการทอผ้าไหมไทย)',
    description:
      'ลายผ้าเอกลักษณ์ประจำจังหวัดศรีสะเกษ ทอด้วยเทคนิคยกดอกแบบโบราณที่สืบทอดกันมากว่า 200 ปี ลวดลายได้แรงบันดาลใจจากผลหวายป่า ปัจจุบันยังมีกลุ่มทอผ้าในหลายอำเภอที่รักษาภูมิปัญญานี้ไว้',
    source: 'สำนักงานหม่อนไหมเฉลิมพระเกียรติฯ เขต 3, chobmai.com',
  },
]
