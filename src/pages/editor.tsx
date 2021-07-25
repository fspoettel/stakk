import cuid from 'cuid';
import { ChangeEvent, MouseEvent, useReducer } from 'react';
import slugify from 'slugify';
import EditorItems from '../components/Editor/EditorItems';
import EditorPreview from '../components/Editor/EditorPreview';
import Field from '../components/Form/Field';
import FieldGroup from '../components/Form/FieldGroup';
import Form from '../components/Form/Form';
import { Stack } from '../types/Stack';

type State = {
  slugEdited: boolean;
  stack: Stack;
};

const initialState: State = {
  slugEdited: false,
  stack: {
    id: cuid(),
    title: 'New Stack',
    slug: 'new-stack',
    author: {
      name: '',
      slug: '',
      url: '',
    },
    theme: {
      background: '#ffd700',
      text: '#25292c'
    },
    items: [
      {
        createdAt: '2021-07-25T13:32:34.323Z',
        id: 'ckrj8qwer00008zbe7ghe0i47',
        title: 'Come To My Garden',
        slug: 'come-to-my-garden',
        tags: [],
        image: 'https://i.scdn.co/image/ab67706c0000bebb473eae913f5a2520aa258375',
        links: [ 'https://open.spotify.com/playlist/3877PFqx7sGMccAWA7tInU' ],
        tracklist: [
          { title: 'Come To My Garden', artist: 'Minnie Riperton' },
          {
            title: 'Insel meiner Angst - Remastered',
            artist: 'Hildegard Knef'
          },
          { title: "It's Raining Today", artist: 'Scott Walker' },
          {
            title: 'Camille (From "Le Mépris")',
            artist: 'Georges Delerue & Renaud Capuçon & Stéphane Denève & Brussels Philharmonic'
          },
          { title: 'I Shall Be Released', artist: 'The Band' },
          {
            title: "Il n'y a pas d'amour heureux - Remasterisé en 2016",
            artist: 'Françoise Hardy'
          },
          { title: 'The Last Time', artist: 'Andrew Oldham Orchestra' },
          { title: 'The Garden Of Jane Delawney', artist: 'Trees' },
          {
            title: 'Play With Fire - Mono Version',
            artist: 'The Rolling Stones'
          },
          {
            title: "I'll Be Your Mirror",
            artist: 'The Velvet Underground & Nico'
          },
          { title: 'One', artist: 'Harry Nilsson' },
          {
            title: 'Bonnie And Clyde',
            artist: 'Brigitte Bardot & Serge Gainsbourg'
          },
          { title: 'Finale', artist: 'José Bartel & Danielle Licari' }
        ]
      },
      {
        createdAt: '2021-07-25T13:16:47.243Z',
        id: 'ckrj86lmz0000ibbe6eufhil9',
        title: 'FoggyDay',
        image: 'https://mosaic.scdn.co/640/ab67616d0000b273263ea3efe12925702eb7b145ab67616d0000b2739d2efe43d5b7ebc7cb60ca81ab67616d0000b273fc2101e6889d6ce9025f85f2ab67616d0000b273fd3abb15ad455d0f08d1bb45',
        slug: 'foggyday',
        tags: [],
        links: [ 'https://open.spotify.com/playlist/6LBvAsyp5pGCdkLows6k6c' ],
        tracklist: [
          { title: 'The Night We Met', artist: 'Lord Huron' },
          { title: 'A closeness', artist: 'Dermot Kennedy' },
          { title: 'Bruises', artist: 'Lewis Capaldi' },
          { title: 'Lost On You', artist: 'Lewis Capaldi' },
          { title: 'Friday Nights', artist: 'Leo Stannard' },
          { title: 'Byegone', artist: 'Volcano Choir' },
          { title: 'What About Us - P!nk Cover', artist: 'Skinny Living' },
          { title: 'Cali', artist: 'Matthew And The Atlas' },
          { title: 'Safe and Sound', artist: 'Christian Leave' },
          { title: 'Glory', artist: 'Dermot Kennedy' },
          { title: 'Fresh Roses', artist: 'Juke Ross' },
          { title: 'Stars', artist: 'Axel Flóvent' },
          {
            title: 'Todo Homem - Ao Vivo',
            artist: 'Zeca Veloso & Caetano Veloso & Moreno Veloso & Tom Veloso'
          },
          { title: 'Let Me In', artist: 'Skinny Living' },
          { title: 'Lights Down Low', artist: 'MAX' },
          { title: '1950', artist: 'King Princess' },
          { title: 'Be Alright', artist: 'Dean Lewis' },
          { title: 'Old Eden', artist: 'Honeywater' },
          { title: 'We Popped the Moon', artist: 'Oliver Riot' },
          { title: 'Ivory Black', artist: 'Oliver Riot' },
          { title: 'Hallucinate', artist: 'Oliver Riot' },
          { title: 'Harder', artist: 'Oliver Riot' },
          { title: 'Old and Grey', artist: 'Harrison Storm' },
          { title: 'Turning Page', artist: 'Sleeping At Last' },
          { title: 'Always', artist: 'Gavin James & Philippine' },
          { title: 'Sense of Home', artist: 'Harrison Storm' },
          { title: 'Old Pine', artist: 'Ben Howard' },
          { title: 'Black Flies', artist: 'Ben Howard' },
          { title: 'Keep Your Head Up', artist: 'Ben Howard' },
          { title: 'These Waters', artist: 'Ben Howard' },
          { title: 'Arrows', artist: 'Haux' },
          { title: 'Neurosis', artist: 'Oliver Riot' },
          { title: "Wouldn\'t Be the Same", artist: 'Tora & Keelan Mak' },
          { title: 'Abusey Junction', artist: 'KOKOROKO' },
          { title: 'Melatonin (Unplugged)', artist: 'Phoria' },
          { title: '31 / 10', artist: 'RKCB & Dave Gibson' },
          { title: 'Oceans', artist: 'Seafret' },
          {
            title: 'To the Sea (feat. Rosie Carney)',
            artist: 'Seafret & Rosie Carney'
          },
          { title: 'Naked', artist: 'James Arthur' },
          { title: 'Lullaby Love - Single Version', artist: 'Roo Panes' },
          { title: 'Get You The Moon (feat. Snøw)', artist: 'Kina & Snøw' },
          { title: 'River Flows in You', artist: 'Daniel Jang' },
          { title: 'River', artist: 'Leon Bridges' },
          { title: 'Remember Me', artist: 'UMI' },
          { title: "Let's Fall in Love for the Night", artist: 'FINNEAS' },
          { title: 'Honeybee', artist: 'The Head And The Heart' },
          { title: 'Falling for U', artist: 'Peachy! & mxmtoon' },
          { title: 'Fear of the Water', artist: 'SYML' },
          { title: "It's You", artist: 'Ali Gatie' },
          { title: 'Heather', artist: 'Conan Gray' },
          { title: 'virgo', artist: 'Jadu Jadu' },
          { title: 'armadillo', artist: 'pucca & Jadu Jadu' },
          { title: 'solitude', artist: 'Jadu Jadu' },
          { title: 'Várias Queixas', artist: 'Gilsons' },
          { title: 'Your Power', artist: 'Billie Eilish' },
          { title: 'Relax', artist: 'Karma Keyz' },
          { title: 'Lost Cause', artist: 'Billie Eilish' },
          { title: 'Hollow - Acoustic', artist: 'Belle Mt.' },
          { title: 'Morning Breeze', artist: 'Juke Ross' },
          { title: "I'm with You", artist: 'Vance Joy' }
        ]
      },
    ],
  },
  
};

type TitleChangeAction = {
  type: 'title-change';
  value: string;
};

type ColorKey = 'background'|'text';

type ColorChangeAction = {
  type: 'color-change';
  value: string;
  key: ColorKey;
};

type AuthorKey = 'url'|'name'|'slug';
type AuthorChangeAction = {
  type: 'author-change';
  value: string;
  key: AuthorKey;
};

type ItemDeleteAction = {
  type: 'item-delete',
  id?: string,
};

type AnyAction = TitleChangeAction|ColorChangeAction|AuthorChangeAction|ItemDeleteAction;

function reducer(state: State, action: AnyAction) {
  switch (action.type) {
    case 'title-change': {
      return {
        ...state,
        stack: {
          ...state.stack,
          title: action.value,
          slug: slugify(action.value),
        }
      };
    }

    case 'color-change': {
      return {
        ...state,
        stack: {
          ...state.stack,
          theme: { ...state.stack.theme, [action.key]: action.value }
        }
      };
    }

    case 'author-change': {
      const isSlugEdit = action.key === 'slug';

      if (isSlugEdit) {
        return {
          slugEdited: true,
          stack: {
            ...state.stack,
            author: {
              ...state.stack.author,
              slug: action.value,
            },
          },
        };
      }

      return {
        ...state,
        stack: {
          ...state.stack,
          author: {
            ...state.stack.author,
            [action.key]: action.value,
            slug: action.key === 'name' && !state.slugEdited
              ? slugify(action.value).toLowerCase()
              : state.stack.author.slug
          }
        }
      };
    }

    case 'item-delete': {
      if (!action.id) return state;

      const index = state.stack.items.findIndex(item => item.id === action.id);
      if (index === -1) return state;

      const nextItems = Array.from(state.stack.items);
      nextItems.splice(index, 1);

      return {
        ...state,
        stack: { ...state.stack, items: nextItems }
      };
    }

    default: {
      return state;
    }
  }
}

function SpotifyImport() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onItemAdd = (evt: MouseEvent) => {
    console.log('item-add');
  };

  const onItemDelete = (evt: MouseEvent) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      const id = evt.currentTarget.dataset.id;
      dispatch({ type: 'item-delete', id });
    }
  };

  const onTitleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'title-change', value: evt.target.value });
  };

  const makeOnColorChange = (key: ColorKey) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'color-change', value: evt.target.value, key });
  };

  const makeOnAuthorChange = (key: AuthorKey) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'author-change', value: evt.target.value, key });
  };

  return (
    <main className='page page_spotify'>
      <Form title='Stack Editor'>
        <Field
          name='title'
          label="Title"
          required
          onChange={onTitleChange}
          value={state.stack.title}
        >
          {(props) => (
            <input {...props} type='text' />
          )}
        </Field>

        <FieldGroup title='Colors'>
          <Field
            name='background-color'
            label='Background'
            onChange={makeOnColorChange('background')}
            required
            value={state.stack.theme.background ?? ''}
          >
            {props => <input {...props} type='color' />}
          </Field>
          <Field
            name='text-color'
            label='Text'
            onChange={makeOnColorChange('text')}
            required
            value={state.stack.theme.text ?? ''}
          >
            {props => <input {...props} type='color' />}
          </Field>
        </FieldGroup>

        <FieldGroup title='Author' full>
          <Field
            name='author-name'
            label='Display Name'
            onChange={makeOnAuthorChange('name')}
            required
            value={state.stack.author.name ?? ''}
          >
            {props => <input {...props} type='text' />}
          </Field>
          <Field
            name='author-slug'
            label='User Name'
            onChange={makeOnAuthorChange('slug')}
            required
            value={state.stack.author.slug ?? ''}
          >
            {props => <input {...props} type='text' />}
          </Field>
          <Field
            name='author-name'
            label='URL'
            onChange={makeOnAuthorChange('url')}
            required
            value={state.stack.author.url ?? ''}
          >
            {props => <input {...props} type='text' />}
          </Field>
        </FieldGroup>

        <FieldGroup title='Items' full>
          <EditorItems
            items={state.stack.items}
            onItemAdd={onItemAdd}
            onItemDelete={onItemDelete}
          />
        </FieldGroup>
      </Form>

      <EditorPreview data={state.stack} />
    </main>
  );
}

export default SpotifyImport;
