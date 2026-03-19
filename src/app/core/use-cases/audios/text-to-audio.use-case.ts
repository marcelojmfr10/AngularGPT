import type { OrthographyResponse } from '@interfaces/orthography.response';
import { environment } from 'environments/environment.development';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!response.ok) throw new Error('No se pudo generar el audio');

    const audioFile = await response.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: '',
      audioUrl: 'No se pudo generar el audio',
    };
  }
};
