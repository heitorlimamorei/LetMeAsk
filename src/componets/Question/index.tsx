import { ReactNode } from 'react';
import './styles.scss'
import cx from 'classnames';


type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlited?: boolean;
};

export function Question({ content, author, children ,isAnswered = false ,isHighlited = false }: QuestionProps) {
return (
  <div className={cx(
    'question', 
    { answered: isAnswered },
    { highlighted: isHighlited && !isAnswered },
  )}>
    <p>{content}</p>
    <footer>
      <div className="user-info">
        <img src={author.avatar} alt={author.avatar} />
        <span>{author.name}</span>
      </div>
      <div>{children}</div>
    </footer>
  </div>
)
}
