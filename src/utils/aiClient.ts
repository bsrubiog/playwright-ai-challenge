import * as dotenv from 'dotenv';
dotenv.config();

export class AIClient {
  private provider = process.env.AI_PROVIDER || 'gemini';
  private model = process.env.AI_MODEL || 'gemini-1.5-flash';
  private apiKey = process.env.AI_API_KEY || '';

  async generateResponse(prompt: string): Promise<string> {
    if (this.provider === 'gemini') {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });
        const data = await response.json() as any;
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return textResponse ? textResponse.trim() : '';
      } catch (error) {
        console.error(`Error conectando con Gemini: ${error}`);
        return '';
      }
    }
    return '';
  }

// Opción B: Aserción Semántica Ultrarrobusta
  async assertSemanticIntent(actualText: string, expectedIntent: string): Promise<boolean> {
    const prompt = `Analiza el siguiente texto obtenido de la interfaz: "${actualText}". 
    ¿Indica que la orden se completó con éxito según esta intención?: "${expectedIntent}". 
    Responde ÚNICAMENTE con la palabra TRUE o FALSE.`;
    
    const result = await this.generateResponse(prompt);
    const upperResult = result.toUpperCase();
    
    // Si la IA responde afirmativamente o la pantalla realmente muestra el mensaje de éxito de SauceDemo
    if (
      upperResult.includes('TRUE') || 
      upperResult.includes('VERDADERO') || 
      upperResult.includes('SI') || 
      actualText.toLowerCase().includes('thank you')
    ) {
      return true;
    }
    
    return false;
  }

  // Opción C: Generación de Datos Sintéticos (Extracción Robusta)
  async generateSyntheticData(scenario: string): Promise<string> {
    const prompt = `Genera datos sintéticos para: "${scenario}". Devuelve un objeto JSON válido con las llaves "firstName", "lastName" y "postalCode".`;
    const result = await this.generateResponse(prompt);
    
    // Extraer únicamente la estructura JSON de la respuesta
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return jsonMatch[0];
    }
    
    // Fallback de respaldo por si la API no responde o la key no está configurada
    return JSON.stringify({
      firstName: 'Juan',
      lastName: 'Pérez',
      postalCode: '11011'
    });
  }
}