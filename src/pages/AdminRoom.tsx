import logoImg from "../assets/images/logo.svg"
import DeleteImg from "../assets/images/delete.svg"
import {Button} from '../componets/Button'
import { useHistory, useParams } from 'react-router-dom'
import { RoomCode } from "../componets/RoomCode";
import "../styles/room.scss";
//import { FormEvent, useState } from "react";
//import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../componets/Question";
import { useRoom } from "../hooks/useRoom";
import checkImg from "../assets/images/check.svg"
import answerImg from "../assets/images/answer.svg"


type RoomParams = {
    id: string;
}
export function AdminRoom() {
    //const { user } = useAuth()
    const history = useHistory();
    const params = useParams<RoomParams>();
    //const [newQuestion, setNewQuestion] = useState('');
   

    const roomId = params.id
    const { questions,title } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })
        history.push('/')
    }
    async function handleDeleQuestion(questionId: string) {
         if (window.confirm('Tem certeza que você deseja excluir essas pergunta')) {
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
         }
    }
    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
          isAnswered: true,
        })
      }
    
      async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlited: true,
        })
      }
    
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                    <RoomCode code={roomId}/>
                    <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                    
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {  questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
                    
                </div>
                <div className="question-list">
                {questions.map(question => {
                    return (
                        <Question
                        key={question.id}
                        content={question.content}
                        author={question.author}
                        isAnswered={question.isAnswered}
                        isHighlited={question.isHighlited}
                        > 
                        {!question.isAnswered && ( 
                            <>
                            <button
                            type="button"
                            onClick={()=>handleCheckQuestionAsAnswered(question.id)} 
                            >
                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                            </button>
                            <button
                            type="button"
                            onClick={()=> handleHighlightQuestion(question.id)} 
                            >
                                <img src={answerImg} alt="Responder a pergunta" />
                            </button>
                            </>
                        )}
                            <button
                            type="button"
                            onClick={()=> handleDeleQuestion(question.id)} 
                            >
                                <img src={DeleteImg} alt="Deletar" />
                            </button>
                    </Question>
                    )
                })}
                </div>
            </main>
        </div>
    );
};