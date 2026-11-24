export const projectReports = {
  'mandarin-speech-envelope': {
    title: 'Investigation of Temporal Amplitude Envelope Information in Mandarin Speech',
    subtitle: 'Internship Research Report',
    tags: ['Internship', 'Speech', 'Emotion Perception'],
    blocks: [
      { type: 'heading', text: 'Research Background' },
      { type: 'paragraph', text: 'Emotional expression in speech plays a vital role in communication. Previous studies using Japanese noise-vocoded speech suggested that temporal amplitude envelopes provide crucial perceptual cues for urgency. However, their effect on Mandarin speech remains unclear.' },

      { type: 'heading', text: 'Research Objective' },
      { type: 'paragraph', text: 'This study investigates whether temporal amplitude envelope cues in Mandarin speech affect emotion perception, using both original and noise-vocoded samples.' },

      { type: 'heading', text: 'Methodology' },
      { type: 'list', ordered: true, items: [
        'Generate noise-vocoded speech from normalized audio samples.',
        'Conduct listening experiments with 5 native Mandarin speakers in a soundproof room.',
        'Participants label 50 samples each from original and vocoded speech.'
      ] },
      { type: 'figure', src: '/static/img/noise_vocoded_process.png', caption: 'Figure 5: Schematic diagram of noise-vocoded speech synthesis' },

      { type: 'heading', text: 'Experimental Results' },
      { type: 'figureGrid', items: [
        { src: '/static/img/original_accuracy.png', caption: 'Figure 1: Accuracy of emotion recognition in original speech' },
        { src: '/static/img/vocoded_accuracy.png', caption: 'Figure 2: Accuracy of emotion recognition in noise-vocoded speech' },
        { src: '/static/img/original_confusion.png', caption: 'Figure 3: Emotion classification tendencies in original speech' },
        { src: '/static/img/vocoded_confusion.png', caption: 'Figure 4: Emotion classification tendencies in vocoded speech' }
      ] },

      { type: 'heading', text: 'Conclusion' },
      { type: 'list', ordered: false, items: [
        'Temporal amplitude envelope cues affect emotion perception in Mandarin speech.',
        'Classification trends in noise-vocoded speech resemble those in original speech.',
        'Some consistent confusions were observed (e.g., happy → surprise, angry → surprise).'
      ] },

      { type: 'heading', text: 'Reference' },
      { type: 'paragraph', text: 'Unoki, Y., Kawamura, M., Kitani, S., Kobayashi, M., & Akagi, M. (2019). "Examination of amplitude envelope cues contributing to perception of urgency in speech." Acoustical Society of Japan, Noise & Vibration Committee.' }
    ]
  }
}
