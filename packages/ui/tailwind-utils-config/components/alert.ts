export default {
  '.cn-alert': {
    gap: 'var(--cn-alert-gap)',
    paddingBlock: 'var(--cn-alert-py)',
    paddingLeft: 'var(--cn-alert-pl)',
    paddingRight: 'var(--cn-alert-pr)',
    borderRadius: 'var(--cn-alert-radius)',
    minWidth: 'var(--cn-alert-min-width)',
    backgroundColor: 'var(--cn-set-gray-soft-bg)',
    color: 'var(--cn-text-1)',
    '@apply w-full flex relative': '',

    '&-content': {
      '@apply flex flex-col gap-1 flex-1': ''
    },

    '&-title': {
      '@apply font-body-strong': ''
    },

    '&-description': {
      '@apply font-body-normal': ''
    },

    '&-close-button': {
      '&:where(:focus-visible)': {
        position: 'absolute !important'
      },
      '@apply absolute right-2 top-2': ''
    },

    '&:where(.cn-alert-info)': {
      backgroundColor: 'var(--cn-set-gray-soft-bg)',
      '> .cn-alert-icon': {
        color: 'var(--cn-text-2)'
      }
    },

    '&:where(.cn-alert-danger)': {
      backgroundColor: 'var(--cn-set-red-soft-bg)',
      '> .cn-alert-icon': {
        color: 'var(--cn-text-danger)'
      }
    },

    '&:where(.cn-alert-warning)': {
      backgroundColor: 'var(--cn-set-yellow-soft-bg)',
      '> .cn-alert-icon': {
        color: 'var(--cn-text-warning)'
      }
    }
  }
}
