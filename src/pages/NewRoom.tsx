
import { FormEvent } from 'react';
import {Link, useHistory} from 'react-router-dom'
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";
import {Button} from '../componets/Button'
import { useAuth } from "../hooks/useAuth"
import { useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory()
 async function handleCreateRoom(event: FormEvent) {
  
  
   event.preventDefault();
   
   if (newRoom.trim() ==='') {
     return;
   }

   const roomRef = database.ref('rooms');
   const firebaseRoom = await roomRef.push({
     title: newRoom,
     authorId: user?.id,
   })
   history.push(`/rooms/${firebaseRoom.key}`);
  }
  
  const  { user } = useAuth();
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração" />
        <strong>Crie salas de Q&amp;A Ao-vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Ilustração" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" 
            placeholder="Nome da sala" 
            onChange={event => setNewRoom(event.target.value)}
            value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
              Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
