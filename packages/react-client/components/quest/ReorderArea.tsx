import { useRef, useState } from "react";

const ITEM_HEIGHT = 40;

type ReorderAreaProps = {
  active: boolean;
  ids: string[];
  setGrabbedPosition: (grabbedPosition: number) => void;
  setGrabbedId: (grabbedId: string | null) => void;
  grabbedId: string | null;
  move: (from: number, to: number) => void;
}

export function ReorderArea({ children, props }: { children: React.ReactNode, props: ReorderAreaProps }) {
  const { active, ids, setGrabbedPosition, setGrabbedId, grabbedId, move } = props;

  const [scrollStart, setScrollStart] = useState<number>(0);
  const [clientYStart, setclientYStart] = useState<number>(0);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const grab = (clientY: number) => {
    if (!scrollAreaRef.current) {
      return;
    }

    const position = clientY - scrollAreaRef.current.offsetTop;

    if (position < 0 || position > scrollAreaRef.current.offsetHeight) {
      return;
    }

    const scrolledPosition = position + scrollAreaRef.current.scrollTop;
    setGrabbedPosition(scrolledPosition - ITEM_HEIGHT * 0.5);

    const index = Math.floor(scrolledPosition / ITEM_HEIGHT);

    setGrabbedId(ids.at(index) || null);
  };

  const handlePointerMove = (clientY: number) => {
    if (!scrollAreaRef.current) {
      return;
    }

    if (grabbedId === null) {
      return;
    }

    const position = clientY - scrollAreaRef.current.offsetTop;

    if (position < ITEM_HEIGHT * 0.5 || position > scrollAreaRef.current.offsetHeight - ITEM_HEIGHT * 0.5) {
      return;
    }

    const scrolledPosition = position + scrollAreaRef.current.scrollTop;
    setGrabbedPosition(scrolledPosition - ITEM_HEIGHT * 0.5);

    const toIndex = Math.floor(scrolledPosition / ITEM_HEIGHT);
    const fromIndex = ids.indexOf(grabbedId);

    if (toIndex === fromIndex) {
      return;
    }

    move(fromIndex, toIndex);
  };

  const startScroll = (clientY: number) => {
    if (!scrollAreaRef.current) {
      return;
    }

    setScrollStart(scrollAreaRef.current.scrollTop);
    setclientYStart(clientY);
  };

  const scroll = (clientY: number) => {
    if (!scrollAreaRef.current) {
      return;
    }

    const clientYDiff = clientY - clientYStart;
    scrollAreaRef.current.scrollBy(0, scrollStart - clientYDiff);
  };

  return active
    ? (<div
      onPointerDown={
        (event) =>
          event.isPrimary ? grab(event.clientY) : startScroll(event.clientY)
      }
      onPointerMove={(event) =>
        event.isPrimary
          ? handlePointerMove(event.clientY)
          : scroll(event.clientY)
      }
      onPointerUp={(event) => event.isPrimary && setGrabbedId(null)}
      onContextMenu={(event) => event.preventDefault()}
      className="select-none touch-none w-full overflow-y-auto mb-4"
      ref={scrollAreaRef}
    > {children}</div >)
    : (<div className="w-full overflow-y-auto mb-4">{children}</div>)
}