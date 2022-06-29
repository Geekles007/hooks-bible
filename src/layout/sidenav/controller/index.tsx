import CodeShower from "../../../components/code-shower";
import React from "react";

export interface ISideNavProps {
    title?: string;
    hookCode?: string;
    usageCode?: string;
    description?: JSX.Element | string;
}

class SidenavController {

    hooks: Map<string, ISideNavProps> = new Map<string, ISideNavProps>([
        [
            "use-outside-click", {
            title: "useOutsideClick()",
            description: <p>A little hook that allows you to listen for clicks outside of a component based on a
                ref. </p>,
            hookCode: `
import React, {RefObject} from 'react';

const useOutsideClick = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: Function): void => {

    React.useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [ref]);
};

export default useOutsideClick;
                `,
            usageCode: `
import {useRef} from "react";
import useOutsideClick from "./useOutsideClick";

const App = () => {
  
  const ref = useRef(null);

  const handleInsideClick = () => {
    console.log('clicked inside')
  }

  const handleOutsideClick = () => {
    console.log('clicked outside')
  }

  useOutsideClick(ref, handleOutsideClick);

  return (
    <button
      ref={ref}
      onClick={handleInsideClick}
      style={{ width: 100, height: 100, background: 'black' }}
    />
  )

}

export default App;`
        }
        ],
        [
            "use-fetch", {
            title: "useFetch()",
            hookCode: `
import { useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  error?: Error;
  loading?: boolean;
  refetch?: () => void;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: "init"; payload: () => void }
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

const useFetch = <T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> => {
  const cache = useRef<Cache<T>>({});

  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "init":
        return { ...initialState, refetch: action.payload };
      case "loading":
        return { ...initialState, loading: true };
      case "fetched":
        return { ...initialState, data: action.payload, loading: false };
      case "error":
        return { ...initialState, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
      }
    };

    dispatch({ type: "init", payload: fetchData });

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
};

export default useFetch;

                `,
            usageCode: `
import React from 'react'

import { useFetch } from './useFetch'

const url = "http://jsonplaceholder.typicode.com/posts"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default function Component() {
  const { data, error, loading } = useFetch<Post[]>(url)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Here is an error, please.</p>
  if (!data) return <p>Nothing found.</p>
  return <p>{data[0].title}</p>
}
                `,
            description: <p>
                This a React Hook allows you to retrieve data on an API using the native Fetch API
                and <strong>Reducer</strong> to
                separate the whole state logic.
                <br/>
                The received data is saved (<strong>cached</strong>) in the application via useRef, but you can
                use <strong>LocalStorage</strong> or a
                <strong>caching solution</strong> to persist the data.
                <br/>
                The fetch is executed when the component is mounted and if the url changes. If ever the url is
                undefined, or if the component is unmounted before the data is recovered, the fetch will not be called.
                <br/>
                This hook also takes the request config as a second parameter in order to be able to pass the
                authorization token in the header of the request, for example. Be careful though, the latter does not
                trigger a re-rendering in case of modification, go through the url params to dynamically change the
                request.
                <br/>
                You can also refresh the data by calling the <strong>refetch</strong> function.
            </p>
        }
        ],
        [
            "use-close-tab", {
            title: "useCloseTab()",
            hookCode: `
import { useEffect } from "react";

export const useCloseTab = (
  message: string,
  callback: (...args: any) => void
) => {
  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      return (event.returnValue = message);
    };

    window.addEventListener("beforeunload", handleTabClose);

    window.addEventListener("unload", callback);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);
};
            `,
            usageCode: `
import { useCloseTab } from "./useCloseTab";
import React from "react";

export default function Component() {
  useCloseTab("Are you really want to leave?", () => {
    console.log("Bye :(");
  });

  return <p>Hey! :)</p>;
}
            `,
            description: <p>
                This hook allows you to add a <strong>beforeunload</strong> event to the window, which will
                ask the user if he really wants to leave the page. and execute a <strong>callback</strong> function when
                the user
                clicks on the <strong>"Leave"</strong> button.
            </p>
        }
        ],
        [
            "use-window-dimensions", {
            title: "useWindowDimensions()",
            hookCode: `
import {useEffect, useState} from "react";

export interface IDimension {
    width: number;
    height: number;
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<IDimension>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
            `,
            usageCode: `
import { useWindowDimensions } from "./useWindowDimensions";
import React from "react";

const App = () => {
    const { width, height } = useWindowDimensions();
    
    return <p>{width} x {height}</p>;            
}

export default App;`,
            description: <p>
                This hook allows you to get the current window dimensions.
            </p>
        }
        ],
        [
            "use-is-mounted", {
            title: "useIsMounted()",
            hookCode: `
import { useCallback, useEffect, useRef } from 'react'

function useIsMounted() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}

export default useIsMounted
            `,
            usageCode: `
import React, { useEffect, useState } from 'react'

import useIsMounted from './useIsMounted';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function Child() {
  const [data, setData] = useState('loading')
  const isMounted = useIsMounted()

  // simulate an api call and update state
  useEffect(() => {
    void delay(3000).then(() => {
      if (isMounted()) setData('OK')
    })
  }, [isMounted])

  return <p>{data}</p>
}

export default function Component() {
  const [isVisible, setVisible] = useState<boolean>(false)

  const toggleVisibility = () => setVisible(state => !state)

  return (
    <>
      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>

      {isVisible && <Child />}
    </>
  )
}
            `,
            description: <p>
                In React, once a component is unmounted, it is deleted from memory and will never be mounted again.
                That's why we don't define a state in a disassembled component. Changing the state in an unmounted
                component will result this error:
                <CodeShower code={
                    `
Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                    `
                } />
                The right way to solve this is cleaning effect like the above message said.<br/><br/>
                But, there are some cases like Promise or API calls where it's impossible to know if the component is still mounted at the resolve time.<br/><br/>
                This React hook help you to avoid this error with a function that return a boolean, isMounted.
            </p>
        }
        ],
    ])

}

export default new SidenavController();
