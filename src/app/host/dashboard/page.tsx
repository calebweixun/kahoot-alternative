'use client'

import { QuizSet, supabase } from '@/types/types'
import { useEffect, useState } from 'react'

export default function Home() {
  const [quizSet, setQuizSet] = useState<QuizSet[]>([])

  useEffect(() => {
    const getQuizSets = async () => {
      const { data, error } = await supabase
        .from('quiz_sets')
        .select(`*, questions(*, choices(*))`)
        .order('created_at', { ascending: false })
      if (error) {
        alert('Failed to fetch quiz sets')
        return
      }
      setQuizSet(data)
    }
    getQuizSets()
  }, [])

  const startGame = async (quizSetId: string) => {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession()

    if (!sessionData.session) {
      const { error: authError } = await supabase.auth.signInAnonymously()
      if (authError) {
        console.error('Anonymous sign-in failed:', authError)
        alert(
          'Failed to sign in anonymously. Please enable Anonymous Sign-ins in Supabase Dashboard > Authentication > Providers.'
        )
        return
      }
    }

    const { data, error } = await supabase
      .from('games')
      .insert({
        quiz_set_id: quizSetId,
      })
      .select()
      .single()
    if (error) {
      console.error(error)
      alert('Failed to start game')
      return
    }

    const gameId = data.id
    window.open(`/host/game/${gameId}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {quizSet.map((quizSet) => (
        <div
          key={quizSet.id}
          className="flex justify-start bg-[#252525] shadow-lg my-4 mx-2 rounded-lg border border-gray-800 overflow-hidden transition-transform hover:scale-[1.01]"
        >
          <img className="h-32 w-32 object-cover" src="/default.png" alt="default quiz image" />
          <div className="p-4 flex flex-col justify-between items-stretch flex-grow">
            <h2 className="font-bold text-xl text-white">{quizSet.name}</h2>
            <div className="flex justify-between items-end mt-2">
              <div className="text-gray-400">{quizSet.questions.length} questions</div>
              <div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-semibold transition-colors shadow-md"
                  onClick={() => startGame(quizSet.id)}
                >
                  Start Game
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
