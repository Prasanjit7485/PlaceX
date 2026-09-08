export const EVENT_COLOR_PALETTE = {
  deadline: { bg: '#E11D48', border: '#BE123C', text: '#FFFFFF', name: 'Rose / Red' },
  task: { bg: '#2563EB', border: '#1D4ED8', text: '#FFFFFF', name: 'Blue' },
  assessment: { bg: '#D97706', border: '#B45309', text: '#FFFFFF', name: 'Amber / Yellow' },
  interview: { bg: '#059669', border: '#047857', text: '#FFFFFF', name: 'Emerald / Green' },
  other: { bg: '#7C3AED', border: '#6D28D9', text: '#FFFFFF', name: 'Purple' }
};

export const getEventColor = (event: { id?: string | number; title?: string; eventType?: string }) => {
  const type = (event.eventType || event.title || '').toLowerCase();
  if (type.includes('deadline') || type.includes('last date') || type.includes('cutoff')) {
    return EVENT_COLOR_PALETTE.deadline;
  }
  if (type.includes('assessment') || type.includes('test') || type.includes('coding') || type.includes('exam') || type.includes('aptitude')) {
    return EVENT_COLOR_PALETTE.assessment;
  }
  if (type.includes('interview') || type.includes('technical') || type.includes('hr') || type.includes('round')) {
    return EVENT_COLOR_PALETTE.interview;
  }
  if (type.includes('task') || type.includes('tpo') || type.includes('drive') || type.includes('talk') || type.includes('ppt')) {
    return EVENT_COLOR_PALETTE.task;
  }
  return EVENT_COLOR_PALETTE.other;
};
