import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, MessageSquareText, Lightbulb } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { api } from '@/lib/api'; // Import the API utility

const NotesUploadsTab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setExtractedText(''); // Clear previous text
      setSummary('');
      setAnswer('');
      setQuestion('');
    }
  };

  const handleUploadAndOCR = async () => {
    if (!file) {
      showError('Please select a file first.');
      return;
    }
    setLoading(true);
    showSuccess('Uploading file and performing OCR...');
    try {
      const response = await api.ocr.extractText(file);
      setExtractedText(response.text);
      showSuccess('Text extracted successfully!');
    } catch (error) {
      console.error('OCR error:', error);
      showError('Failed to extract text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!extractedText) {
      showError('Please extract text first.');
      return;
    }
    setLoading(true);
    showSuccess('Summarizing text...');
    try {
      const response = await api.ai.summarize(extractedText);
      setSummary(response.summary);
      showSuccess('Text summarized!');
    } catch (error) {
      console.error('Summarization error:', error);
      showError('Failed to summarize text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!extractedText || !question) {
      showError('Please extract text and ask a question.');
      return;
    }
    setLoading(true);
    showSuccess('Asking AI tutor...');
    try {
      const response = await api.ai.askQuestion(extractedText, question);
      setAnswer(response.answer);
      showSuccess('Answer received!');
    } catch (error) {
      console.error('Q&A error:', error);
      showError('Failed to get an answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5" /> Upload Notes/Textbook</CardTitle>
          <CardDescription>Upload an image or PDF to extract text.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} />
          <Button onClick={handleUploadAndOCR} disabled={!file || loading} className="w-full">
            {loading && file ? 'Processing...' : 'Upload & Extract Text'}
          </Button>
          {extractedText && (
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-1"><FileText className="h-4 w-4" /> Extracted Text</h3>
              <Textarea value={extractedText} readOnly rows={10} className="min-h-[200px]" />
              <Button onClick={handleSummarize} disabled={loading} className="w-full">
                {loading && summary ? 'Summarizing...' : 'Summarize Text'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        {summary && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5" /> AI Summary</CardTitle>
              <CardDescription>A simple explanation of the extracted text.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea value={summary} readOnly rows={5} className="min-h-[120px]" />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquareText className="h-5 w-5" /> AI Tutor & Q&A</CardTitle>
            <CardDescription>Ask your study buddy questions about the text.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ask your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              disabled={!extractedText || loading}
            />
            <Button onClick={handleAskQuestion} disabled={!question || !extractedText || loading} className="w-full">
              {loading && answer ? 'Thinking...' : 'Ask Question'}
            </Button>
            {answer && (
              <div className="space-y-2">
                <h3 className="font-semibold">Polaris AI's Answer:</h3>
                <Textarea value={answer} readOnly rows={5} className="min-h-[120px]" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotesUploadsTab;