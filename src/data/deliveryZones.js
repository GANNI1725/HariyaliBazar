const STORAGE_KEY = 'hariyali-delivery-zones'

const DEFAULT_ZONES = [
  { area: 'Butwal', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Batauli', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Batauli Bazaar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Golpark', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Traffic Chowk', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Devinagar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Kalikanagar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Ramnagar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Yogikuti', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Milanchowk', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Rajmarg Chauraha', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Hospital Line', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Sukkhanagar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Deepnagar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Belbas', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Motipur', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Nayamill', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Semlar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Naharpur', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Fulbari', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Tamnagar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Chidiyakhola', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Murgiya', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Mainabagar', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Kunja Park', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Tinau Corridor', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Siddhababa', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Butwal Industrial Area', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Palpa Bus Park', district: 'Rupandehi', sameDay: true, fee: 30 },
  { area: 'Tilottama', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Manigram', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Drivertole', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Janakinagar', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Shankarnagar', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Bhalwari', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Karahiya', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Tikuligadh', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Gangoliya', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Madhabaliya', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Anandaban', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Makrahar', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Dingarnagar', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Ekla', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Shantinagar', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Pragatinagar', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Janajagriti Tole', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Laxminagar', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Mangalapur', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Suryapura', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Pipal Danda', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Yogikuti Border', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Crimson Hospital', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Banbatika', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Kotihawa', district: 'Rupandehi', sameDay: true, fee: 60 },
  { area: 'Siddharthanagar', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Bhairahawa', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Devdaha', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Sainamaina', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Lumbini', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Marchawar', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Saljhandi', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Rohini', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Kotahimai', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Suddhodhan', district: 'Rupandehi', sameDay: false, fee: 120 },
  { area: 'Omsatiya', district: 'Rupandehi', sameDay: false, fee: 120 },
]

const loadZones = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch { /* ignore */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ZONES))
  return DEFAULT_ZONES
}

export let deliveryZones = loadZones()

export const getDeliveryZones = () => loadZones()

export const saveDeliveryZones = (zones) => {
  deliveryZones = zones
  localStorage.setItem(STORAGE_KEY, JSON.stringify(zones))
}

export const checkDelivery = (query) => {
  if (!query) return null
  const normalized = query.trim().toLowerCase()
  const zones = loadZones()
  return (
    zones.find(
      (z) =>
        z.area.toLowerCase().includes(normalized) ||
        z.district.toLowerCase().includes(normalized),
    ) || null
  )
}
