import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'

import type { Attraction } from '../data/attractions'

const PHOTO_SIZE = 56
const TAIL_HEIGHT = 14
const PIN_HEIGHT = PHOTO_SIZE + TAIL_HEIGHT

function createPhotoPinIcon(imageUrl: string, pinColor: string, ringColor: string): L.DivIcon {
  const html = `
    <div style="position:relative;width:${PHOTO_SIZE}px;height:${PIN_HEIGHT}px;">
      <svg width="20" height="${TAIL_HEIGHT}" viewBox="0 0 20 14"
           style="position:absolute;left:${(PHOTO_SIZE - 20) / 2}px;top:${PHOTO_SIZE - 4}px;">
        <path d="M10 14 L0 0 L20 0 Z" fill="${pinColor}"/>
      </svg>
      <div style="position:absolute;top:0;left:0;width:${PHOTO_SIZE}px;height:${PHOTO_SIZE}px;
                  border-radius:50%;overflow:hidden;box-sizing:border-box;
                  border:3px solid ${pinColor};background:${ringColor};
                  box-shadow:0 0 0 2px ${ringColor}, 0 4px 10px rgba(36,28,21,0.35);">
        <img src="${imageUrl}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" />
      </div>
    </div>
  `
  return L.divIcon({
    html,
    className: 'attraction-marker',
    iconSize: [PHOTO_SIZE, PIN_HEIGHT],
    iconAnchor: [PHOTO_SIZE / 2, PIN_HEIGHT],
    popupAnchor: [0, -PIN_HEIGHT],
  })
}

type LabelDirection = 'top' | 'bottom' | 'right' | 'left'

const LABEL_OFFSETS: Record<LabelDirection, [number, number]> = {
  top: [0, -PIN_HEIGHT + 2],
  bottom: [0, 8],
  right: [PHOTO_SIZE / 2 + 6, -PIN_HEIGHT + PHOTO_SIZE / 2],
  left: [-(PHOTO_SIZE / 2 + 6), -PIN_HEIGHT + PHOTO_SIZE / 2],
}

// Places each label in the first direction not already taken by a nearby pin,
// so labels of close-together attractions don't overlap each other.
function assignLabelDirections(attractions: Attraction[]): Record<string, LabelDirection> {
  const NEARBY_DEGREES = 0.25
  const order: LabelDirection[] = ['top', 'bottom', 'right', 'left']
  const placed: { lat: number; lng: number; direction: LabelDirection }[] = []

  return Object.fromEntries(
    attractions.map((attraction) => {
      const taken = new Set(
        placed
          .filter((p) => Math.hypot(p.lat - attraction.lat, p.lng - attraction.lng) < NEARBY_DEGREES)
          .map((p) => p.direction),
      )
      const direction = order.find((d) => !taken.has(d)) ?? 'top'
      placed.push({ lat: attraction.lat, lng: attraction.lng, direction })
      return [attraction.id, direction]
    }),
  )
}

interface AttractionMapProps {
  attractions: Attraction[]
  onSelect: (attraction: Attraction) => void
}

function ForceView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.invalidateSize()
    map.setView(center, zoom)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])
  return null
}

function AttractionMap({ attractions, onSelect }: AttractionMapProps) {
  const theme = useTheme()
  const icons = useMemo(
    () =>
      Object.fromEntries(
        attractions.map((attraction) => [
          attraction.id,
          createPhotoPinIcon(attraction.image, theme.palette.primary.main, theme.palette.background.paper),
        ]),
      ),
    [attractions, theme],
  )
  const labelDirections = useMemo(() => assignLabelDirections(attractions), [attractions])
  const centerLat = attractions.reduce((sum, a) => sum + a.lat, 0) / attractions.length
  const centerLng = attractions.reduce((sum, a) => sum + a.lng, 0) / attractions.length
  const center: [number, number] = [centerLat, centerLng]

  return (
    <Card
      elevation={6}
      sx={{
        p: 2,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'primary.light',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          height: { xs: 384, md: 480 },
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <MapContainer
          center={center}
          zoom={9}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <ForceView center={center} zoom={9} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {attractions.map((attraction) => (
            <Marker
              key={attraction.id}
              position={[attraction.lat, attraction.lng]}
              icon={icons[attraction.id]}
              eventHandlers={{ click: () => onSelect(attraction) }}
            >
              <Tooltip
                direction={labelDirections[attraction.id]}
                offset={LABEL_OFFSETS[labelDirections[attraction.id]]}
                permanent
                opacity={0.95}
              >
                {attraction.name.split('(')[0].trim()}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Card>
  )
}

export default AttractionMap
