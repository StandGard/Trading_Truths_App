
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Brain, Target, TrendingUp, Calendar, Lightbulb, Heart } from "lucide-react";

const Rules = () => {
  const [disciplineScore, setDisciplineScore] = useState(8);
  const [checkedBiases, setCheckedBiases] = useState<string[]>([]);
  const [habits, setHabits] = useState({ helped: "", hurt: "" });
  const [dailyLearning, setDailyLearning] = useState("");

  const handleBiasToggle = (bias: string) => {
    setCheckedBiases(prev => 
      prev.includes(bias) 
        ? prev.filter(b => b !== bias)
        : [...prev, bias]
    );
  };

  const biases = ["Fear", "Greed", "Overconfidence", "FOMO", "Hesitation", "Impatience"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">My Trading Rules & Self-Mastery</h1>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
          Welcome to your personal rules page — the foundation of your discipline, mindset, and long-term trading success. 
          This is your anchor, your mental reset, and your emotional mirror. Use this space every day.
        </p>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {/* Core Trading Rules */}
        <AccordionItem value="core-rules">
          <AccordionTrigger className="text-xl">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Core Trading Rules
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Must-Follow Rules
                  </CardTitle>
                  <CardDescription>Non-negotiable trading rules. Every trade must follow them.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">✅</Badge>
                      Risk no more than 1–2% per trade
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">✅</Badge>
                      Always define Stop Loss and Take Profit before entering
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">✅</Badge>
                      Trade only during peak focus hours
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">✅</Badge>
                      Enter only if all confluences align
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">✅</Badge>
                      Use checklists before entry
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">✅</Badge>
                      Journal each trade the same day
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    The "Never Do" List
                  </CardTitle>
                  <CardDescription>Avoid these at all costs. These are emotional landmines.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-0.5">❌</Badge>
                      Never trade without a stop loss
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-0.5">❌</Badge>
                      Never revenge trade
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-0.5">❌</Badge>
                      Never increase lot size impulsively
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-0.5">❌</Badge>
                      Never trade to win back a loss
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-0.5">❌</Badge>
                      Never trade when emotionally charged
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-0.5">❌</Badge>
                      Never overtrade — quality over quantity
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Emotional Awareness */}
        <AccordionItem value="emotional-awareness">
          <AccordionTrigger className="text-xl">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Emotional Awareness & Mindset
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emotional Check-In</CardTitle>
                  <CardDescription>Ask yourself these questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Before Trade</h4>
                      <p className="text-sm">How am I feeling? Calm? Anxious? Impatient?</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold mb-2">During Trade</h4>
                      <p className="text-sm">Am I following my plan or reacting emotionally?</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold mb-2">After Trade</h4>
                      <p className="text-sm">What did I feel? Regret? Pride? Indifference?</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recognize These Biases</CardTitle>
                  <CardDescription>Tick any that applied today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {biases.map((bias) => (
                      <div key={bias} className="flex items-center space-x-2">
                        <Checkbox 
                          id={bias}
                          checked={checkedBiases.includes(bias)}
                          onCheckedChange={() => handleBiasToggle(bias)}
                        />
                        <label htmlFor={bias} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {bias}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emotional Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm p-3 bg-gray-50 rounded-lg">"Feelings are not facts."</p>
                    <p className="text-sm p-3 bg-gray-50 rounded-lg">"Discipline &gt; Emotion."</p>
                    <p className="text-sm p-3 bg-gray-50 rounded-lg">"One trade means nothing. Focus on the next 100."</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Learning From Experience */}
        <AccordionItem value="learning">
          <AccordionTrigger className="text-xl">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Learning From Experience
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Trade Reflection Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">What went well?</label>
                    <Textarea placeholder="Reflect on your successes..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">What didn't go well?</label>
                    <Textarea placeholder="Identify areas for improvement..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">What lesson did I learn?</label>
                    <Textarea placeholder="Key insights from today..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">What would I do differently next time?</label>
                    <Textarea placeholder="Action items for improvement..." />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Motivational Reminders */}
        <AccordionItem value="motivation">
          <AccordionTrigger className="text-xl">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Motivational Reminders
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Affirmations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm p-3 bg-blue-50 rounded-lg">"I am a consistent and disciplined trader."</p>
                    <p className="text-sm p-3 bg-blue-50 rounded-lg">"I trade my edge, not my emotions."</p>
                    <p className="text-sm p-3 bg-blue-50 rounded-lg">"Losses are tuition for long-term success."</p>
                    <p className="text-sm p-3 bg-blue-50 rounded-lg">"My job is to execute, not to predict."</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Why</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge>💰</Badge>
                      Financial freedom
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge>⏰</Badge>
                      Time freedom
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge>📈</Badge>
                      Growth and mastery
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge>🏆</Badge>
                      To prove I can become world-class
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Self-Awareness */}
        <AccordionItem value="self-awareness">
          <AccordionTrigger className="text-xl">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Self-Awareness & Personal Development
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Growth Journal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Today I learned...</label>
                      <Input 
                        value={dailyLearning}
                        onChange={(e) => setDailyLearning(e.target.value)}
                        placeholder="What new insight did you gain?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">What habits helped me today?</label>
                      <Input 
                        value={habits.helped}
                        onChange={(e) => setHabits(prev => ({ ...prev, helped: e.target.value }))}
                        placeholder="Positive behaviors that served you well"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">What habits hurt me?</label>
                      <Input 
                        value={habits.hurt}
                        onChange={(e) => setHabits(prev => ({ ...prev, hurt: e.target.value }))}
                        placeholder="Negative patterns to watch out for"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Discipline Score</CardTitle>
                  <CardDescription>Rate your trading discipline today (1-10)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input 
                        type="number" 
                        min="1" 
                        max="10" 
                        value={disciplineScore}
                        onChange={(e) => setDisciplineScore(Number(e.target.value))}
                        className="w-20"
                      />
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${disciplineScore * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {disciplineScore >= 8 ? "Excellent discipline!" : 
                       disciplineScore >= 6 ? "Good discipline, room for improvement." : 
                       "Focus on building stronger discipline habits."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Probability Thinking */}
        <AccordionItem value="probability">
          <AccordionTrigger className="text-xl">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Probability & Risk Thinking
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notes to Reinforce Probability Thinking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm p-3 bg-yellow-50 rounded-lg">A 60% win rate still has losing streaks.</p>
                    <p className="text-sm p-3 bg-yellow-50 rounded-lg">Risk-to-reward is everything.</p>
                    <p className="text-sm p-3 bg-yellow-50 rounded-lg">Consistency is more important than results.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Process Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm p-3 bg-green-50 rounded-lg">Focus on the next 100 trades.</p>
                    <p className="text-sm p-3 bg-green-50 rounded-lg">Don't judge the system based on 1 outcome.</p>
                    <p className="text-sm p-3 bg-green-50 rounded-lg">Stick to your edge — not your emotions.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-center">Final Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            This page is your mirror. It's not just about trading — it's about becoming the person who deserves to win. 
            Visit it daily. Review it weekly. Refine it monthly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
