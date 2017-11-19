import * as JQ from 'jquery';

function setEvents( el: any , fn: () => void )
{
  JQ(el).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', fn)
}

export function TryMail( mail : string )
{
  return mail && mail.match(/^\S*$/) ? '_valid' :'';
}

export function TryPassword( password : string )
{
  return  password.length > 5 ? '_valid' : ''
}

// Dado un HTMLElement, se le asigna una clase (animate.css) y se ejecutara una funcion cuando acabe.
export function Manipulate( el: HTMLElement , cls: string , delay: number  ,fn: () => void )
{
  let FN = () =>
  {
    window.setTimeout( () => {
      // el.classList.remove('animated');
      el.classList.remove( cls );
    }, delay)

    fn();
  }

  setEvents( el , FN );

  if(!el.classList.contains('animated'))
    el.classList.add('animated');
  el.classList.add( cls );
}
