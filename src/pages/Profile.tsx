import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const userCourses = [
  {
    id: 1,
    title: 'Основы веб-разработки',
    source: 'PDF: web-development-basics.pdf',
    progress: 40,
    modules: 2,
    completedModules: 0,
    createdAt: '2 дня назад'
  },
  {
    id: 2,
    title: 'JavaScript для начинающих',
    source: 'YouTube: Introduction to JavaScript',
    progress: 0,
    modules: 5,
    completedModules: 0,
    createdAt: '1 день назад'
  },
];

const stats = {
  totalCourses: 2,
  completedCourses: 0,
  hoursLearned: 3.5,
  currentStreak: 2
};

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Главная
          </Button>
          <div className="flex items-center gap-2">
            <Icon name="GraduationCap" className="text-primary" size={28} />
            <span className="text-xl font-bold text-primary">LearnFlow</span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    ИП
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">Иван Петров</h1>
                  <p className="text-muted-foreground mb-4">ivan.petrov@example.com</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Icon name="Flame" size={20} className="text-orange-500" />
                      <span className="font-medium">{stats.currentStreak} дня подряд</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={20} className="text-blue-500" />
                      <span className="font-medium">{stats.hoursLearned} часов обучения</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="animate-scale-in">
              <CardHeader className="pb-2">
                <CardDescription>Всего курсов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                  <span className="text-3xl font-bold">{stats.totalCourses}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-2">
                <CardDescription>Завершено</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" size={24} className="text-green-500" />
                  <span className="text-3xl font-bold">{stats.completedCourses}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-2">
                <CardDescription>Часов обучения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={24} className="text-blue-500" />
                  <span className="text-3xl font-bold">{stats.hoursLearned}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-2">
                <CardDescription>Дней подряд</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Icon name="Flame" size={24} className="text-orange-500" />
                  <span className="text-3xl font-bold">{stats.currentStreak}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon name="Library" size={24} />
                  Мои курсы
                </span>
                <Button onClick={() => navigate('/')}>
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать курс
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userCourses.map((course, idx) => (
                  <Card 
                    key={course.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => navigate('/course/demo')}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Icon name="FileText" size={16} />
                            <span>{course.source}</span>
                            <span>•</span>
                            <span>{course.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Icon name="Layers" size={16} className="text-primary" />
                              <span>{course.modules} модулей</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="CheckCircle2" size={16} className="text-green-500" />
                              <span>{course.completedModules} завершено</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Icon name="ArrowRight" size={20} />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {userCourses.length === 0 && (
                  <div className="text-center py-16">
                    <Icon name="BookOpen" size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground mb-4">
                      У вас пока нет созданных курсов
                    </p>
                    <Button onClick={() => navigate('/')}>
                      <Icon name="Plus" size={20} className="mr-2" />
                      Создать первый курс
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
