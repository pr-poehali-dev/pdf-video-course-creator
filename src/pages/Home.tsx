import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleCreateCourse = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/course/demo');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="GraduationCap" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">LearnFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/profile')}>
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Превращаем знания в интерактивные курсы
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Загрузите PDF-книгу или ссылку на YouTube-видео — мы автоматически создадим структурированный курс с диалоговым обучением
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="BookOpen" size={20} className="text-primary" />
              <span>PDF в курс</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Youtube" size={20} className="text-secondary" />
              <span>YouTube в уроки</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MessageSquare" size={20} className="text-primary" />
              <span>Диалоговый формат</span>
            </div>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl">Создать новый курс</CardTitle>
            <CardDescription>
              Выберите источник контента для преобразования в интерактивный курс
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pdf" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pdf" className="flex items-center gap-2">
                  <Icon name="FileText" size={18} />
                  PDF Книга
                </TabsTrigger>
                <TabsTrigger value="youtube" className="flex items-center gap-2">
                  <Icon name="Youtube" size={18} />
                  YouTube Видео
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pdf" className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      {pdfFile ? pdfFile.name : 'Загрузите PDF файл'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Перетащите файл или нажмите для выбора
                    </p>
                  </label>
                </div>
                <Button 
                  onClick={handleCreateCourse} 
                  className="w-full" 
                  size="lg"
                  disabled={!pdfFile || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Создаём курс...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" size={20} className="mr-2" />
                      Создать курс
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="youtube" className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="youtube-url" className="text-sm font-medium">
                    Ссылка на YouTube видео
                  </label>
                  <div className="relative">
                    <Icon name="Link" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="youtube-url"
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleCreateCourse} 
                  className="w-full" 
                  size="lg"
                  disabled={!youtubeUrl || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Создаём курс...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" size={20} className="mr-2" />
                      Создать курс
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Upload" size={24} className="text-primary" />
                </div>
                <CardTitle>1. Загрузите контент</CardTitle>
                <CardDescription>
                  PDF-книгу или ссылку на YouTube-видео
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Bot" size={24} className="text-secondary" />
                </div>
                <CardTitle>2. ИИ анализирует</CardTitle>
                <CardDescription>
                  Автоматически создаётся структура курса: модули и темы
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="GraduationCap" size={24} className="text-primary" />
                </div>
                <CardTitle>3. Учитесь легко</CardTitle>
                <CardDescription>
                  Диалоговый формат обучения с практикой
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-20 text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/course/demo')}
            className="gap-2"
          >
            <Icon name="PlayCircle" size={20} />
            Попробовать демо-курс
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
