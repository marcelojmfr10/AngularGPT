import type { TranslateResponse } from '@interfaces/translate.response';
import { environment } from 'environments/environment.development';

export const translateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) throw new Error('No se pudo realizar la traducción');

    const { message } = (await response.json()) as TranslateResponse;

    return {
      ok: true,
      message,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo realizar la traducción',
    };
  }
};
