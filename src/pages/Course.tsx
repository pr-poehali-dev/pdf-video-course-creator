import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Message {
  type: 'assistant' | 'user';
  text: string;
}

const coursData = {
  title: 'Основы веб-разработки',
  description: 'Демонстрационный курс из PDF книги',
  modules: [
    {
      id: 1,
      title: 'Модуль 1: Введение в HTML',
      topics: [
        { id: 1, title: 'Что такое HTML?', completed: false },
        { id: 2, title: 'Структура HTML документа', completed: false },
        { id: 3, title: 'Основные теги', completed: false },
      ]
    },
    {
      id: 2,
      title: 'Модуль 2: Стилизация с CSS',
      topics: [
        { id: 4, title: 'Введение в CSS', completed: false },
        { id: 5, title: 'Селекторы и свойства', completed: false },
      ]
    },
  ]
};

const dialogueScenario: Record<number, Message[]> = {
  1: [
    { type: 'assistant', text: 'Привет! Давай начнём с основ. Как думаешь, что такое HTML?' },
    { type: 'assistant', text: 'HTML — это язык разметки для создания веб-страниц. Он описывает структуру контента.' },
    { type: 'assistant', text: 'Представь, что ты строишь дом 🏠. HTML — это каркас: стены, окна, двери.' },
    { type: 'assistant', text: 'Попробуй создать простой заголовок. Какой тег используется для заголовка первого уровня?' },
  ]
};

const Course = () => {
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completedTopics, setCompletedTopics] = useState<Set<number>>(new Set());

  const totalTopics = coursData.modules.reduce((sum, m) => sum + m.topics.length, 0);
  const progress = (completedTopics.size / totalTopics) * 100;

  const startTopic = (topicId: number) => {
    setCurrentTopic(topicId);
    setMessages([]);
    setMessageIndex(0);
    setUserInput('');
    
    const scenario = dialogueScenario[topicId] || [
      { type: 'assistant', text: 'Добро пожаловать на урок! Начнём изучение этой темы.' }
    ];
    
    setTimeout(() => {
      setMessages([scenario[0]]);
      setMessageIndex(1);
    }, 300);
  };

  const handleNextMessage = () => {
    if (!currentTopic) return;
    
    if (userInput.trim()) {
      setMessages(prev => [...prev, { type: 'user', text: userInput }]);
      setUserInput('');
      
      setTimeout(() => {
        const scenario = dialogueScenario[currentTopic];
        if (scenario && messageIndex < scenario.length) {
          setMessages(prev => [...prev, scenario[messageIndex]]);
          setMessageIndex(prev => prev + 1);
        } else {
          setMessages(prev => [...prev, { 
            type: 'assistant', 
            text: '🎉 Отличная работа! Тема пройдена. Переходи к следующей!' 
          }]);
          setCompletedTopics(prev => new Set([...prev, currentTopic]));
        }
      }, 800);
    } else {
      const scenario = dialogueScenario[currentTopic];
      if (scenario && messageIndex < scenario.length) {
        setMessages(prev => [...prev, scenario[messageIndex]]);
        setMessageIndex(prev => prev + 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <div className="flex items-center gap-2">
            <Icon name="GraduationCap" className="text-primary" size={28} />
            <span className="text-xl font-bold text-primary">LearnFlow</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/profile')}>
            <Icon name="User" size={20} />
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">{coursData.title}</h1>
            <p className="text-muted-foreground mb-4">{coursData.description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Прогресс курса</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 h-fit animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" size={20} />
                  Содержание курса
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {coursData.modules.map((module) => (
                    <AccordionItem key={module.id} value={`module-${module.id}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium">{module.title}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-2">
                          {module.topics.map((topic) => (
                            <Button
                              key={topic.id}
                              variant={currentTopic === topic.id ? 'default' : 'ghost'}
                              className="w-full justify-start text-left"
                              onClick={() => startTopic(topic.id)}
                            >
                              <Icon 
                                name={completedTopics.has(topic.id) ? 'CheckCircle2' : 'Circle'} 
                                size={16} 
                                className="mr-2 flex-shrink-0"
                              />
                              <span className="truncate">{topic.title}</span>
                            </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={20} />
                  Диалоговое обучение
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!currentTopic ? (
                  <div className="text-center py-16">
                    <Icon name="BookOpen" size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground mb-2">
                      Выберите тему из содержания курса
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Диалоговый формат поможет вам легко усвоить материал
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="h-[400px] overflow-y-auto space-y-4 p-4 bg-muted/30 rounded-lg">
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg ${
                              msg.type === 'user'
                                ? 'bg-primary text-primary-foreground ml-auto'
                                : 'bg-white shadow-sm'
                            }`}
                          >
                            {msg.type === 'assistant' && (
                              <Icon name="Bot" size={20} className="mb-2 text-primary" />
                            )}
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleNextMessage()}
                        placeholder="Введите ваш ответ..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button onClick={handleNextMessage}>
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
