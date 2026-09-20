import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { ChevronDown } from 'lucide-react'

import { faqEntries } from '../../data/faq'
import useSectionReveal from '../../hooks/useSectionReveal'

function FaqSection() {
  const scope = useSectionReveal('[data-reveal]')

  return (
    <Box ref={scope} sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 10 } }} id="faq">
      <Container maxWidth="md">
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="primary">
            คำถามที่พบบ่อย
          </Typography>
          <Typography variant="h3">ถาม-ตอบก่อนออกเดินทาง</Typography>
        </Stack>

        <Stack spacing={1.5}>
          {faqEntries.map((entry) => (
            <Accordion key={entry.id} data-reveal variant="outlined" disableGutters sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ChevronDown strokeWidth={1.5} size={20} />}>
                <Typography sx={{ fontWeight: 700 }}>{entry.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{entry.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default FaqSection
