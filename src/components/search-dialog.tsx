// "use client";

// import React, {
//   useState,
//   useMemo,
//   forwardRef,
//   useImperativeHandle,
//   useEffect,
// } from "react";
// import * as Dialog from "@radix-ui/react-dialog";

// import clsx from "clsx";
// import SearchButton from "@/components/search-button";

// // Define a type for your document data.
// export interface DocType {
//   title: string;
//   body: { raw?: string };
//   _raw: { flattenedPath: string };
// }

// export interface SearchDialogProps {
//   searchData: DocType[];
// }

// export interface SearchDialogHandle {
//   close: () => void;
//   open: () => void;
// }

// // Helper function to highlight search text.
// function highlightText(text: string, searchTerm: string): React.ReactNode {
//   if (!searchTerm) return text;
//   const regex = new RegExp(`(${searchTerm})`, "gi");
//   const parts = text.split(regex);
//   return (
//     <>
//       {parts.map((part, i) =>
//         regex.test(part) ? (
//           <span key={i} className="bg-yellow-300">
//             {part}
//           </span>
//         ) : (
//           part
//         )
//       )}
//     </>
//   );
// }

// // ForwardRef component so the parent can control open/close if needed.
// const SearchDialog = forwardRef<SearchDialogHandle, SearchDialogProps>(
//   ({ searchData }, ref) => {
//     const [open, setOpen] = useState(false);
//     const [query, setQuery] = useState("");

//     // Expose open and close functions via the ref.
//     useImperativeHandle(ref, () => ({
//       close: () => setOpen(false),
//       open: () => setOpen(true),
//     }));

//     // Listen for Command+K / Ctrl+K to open the dialog.
//     useEffect(() => {
//       const handleKeyDown = (e: KeyboardEvent) => {
//         if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
//           e.preventDefault();
//           setOpen(true);
//         }
//       };
//       document.addEventListener("keydown", handleKeyDown);
//       return () => document.removeEventListener("keydown", handleKeyDown);
//     }, []);

//     // Filter documents based on query.
//     const filteredDocs = useMemo(() => {
//       if (!query) return [];
//       const q = query.toLowerCase();
//       return searchData.filter((doc) => {
//         const title = doc.title.toLowerCase();
//         const description = (doc.body.raw || "").toLowerCase();
//         return title.includes(q) || description.includes(q);
//       });
//     }, [query, searchData]);

//     return (
//       <Dialog.Root open={open} onOpenChange={setOpen}>
//         <Dialog.Trigger asChild>
//           <SearchButton size={'sm'} onClick={() => setOpen(true)} placeholder="search documentation.."/>
//         </Dialog.Trigger>
//         <Dialog.Portal>
//           <Dialog.Overlay
//             className={clsx(
//               "fixed inset-0 bg-black/50 transition-opacity duration-300 ease-out",
//               "data-[state=open]:opacity-100",
//               "data-[state=closed]:opacity-0"
//             )}
//           />
//           <Dialog.Content
//             className={clsx(
//               "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
//               "w-[90%] max-w-[500px] rounded-md bg-white p-4 shadow-lg",
//               "transition-all duration-300 ease-out",
//               "data-[state=open]:opacity-100 data-[state=open]:scale-100",
//               "data-[state=closed]:opacity-0 data-[state=closed]:scale-95"
//             )}
//           >
//             <Dialog.Title className="m-0 text-xl font-bold">
//               Search Documentation
//             </Dialog.Title>
//             <Dialog.Description className="mt-2 mb-4 text-base text-gray-600">
//               Type to search through docs.
//             </Dialog.Description>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//               autoFocus
//             />
//             {filteredDocs.length > 0 ? (
//               <ul className="list-none p-0 max-h-[300px] overflow-y-auto">
//                 {filteredDocs.map((doc) => (
//                   <li
//                     key={doc._raw.flattenedPath}
//                     className="py-2 border-b border-gray-200"
//                   >
//                     <div className="font-bold">
//                       {highlightText(doc.title, query)}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {highlightText(doc.body.raw || "No description", query)}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-600">No results found.</p>
//             )}
//             <Dialog.Close asChild>
//               <button className="mt-4 py-2 px-4 bg-gray-200 rounded cursor-pointer">
//                 Close
//               </button>
//             </Dialog.Close>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     );
//   }
// );

// SearchDialog.displayName = "SearchDialog";

// export default SearchDialog;
"use client";

import React, {
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import SearchButton from "@/components/search-button";
import { Text, Search } from "lucide-react"
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Define a type for your document data.
export interface DocType {
  title: string;
  body: { raw?: string };
  _raw: { flattenedPath: string };
}

export interface SearchDialogProps {
  searchData: DocType[];
}

export interface SearchDialogHandle {
  close: () => void;
  open: () => void;
}

// Helper function to highlight search text.
function highlightText(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-300 dark:text-black rounded-sm">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

// Helper function to extract a snippet around the search term.
function getSnippet(
  text: string,
  searchTerm: string,
  contextLength: number = 40
): React.ReactNode {
  if (!searchTerm) return text;
  const regex = new RegExp(searchTerm, "i");
  const match = regex.exec(text);
  if (!match) return text;
  const start = Math.max(0, match.index - contextLength);
  const end = Math.min(text.length, match.index + match[0].length + contextLength);
  const snippet = text.substring(start, end);
  return (
    <>
      {start > 0 && "…"}
      {highlightText(snippet, searchTerm)}
      {end < text.length && "…"}
    </>
  );
}

// ForwardRef component so the parent can control open/close if needed.
const SearchDialog = forwardRef<SearchDialogHandle, SearchDialogProps>(
  ({ searchData, className }, ref) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    // Expose open and close functions via the ref.
    useImperativeHandle(ref, () => ({
      close: () => setOpen(false),
      open: () => setOpen(true),
    }));

    // Listen for Command+K / Ctrl+K to open the dialog.
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setOpen(true);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Filter documents based on query.
    const filteredDocs = useMemo(() => {
      if (!query) return [];
      const q = query.toLowerCase();
      return searchData.filter((doc) => {
        const title = doc.title.toLowerCase();
        const description = (doc.body.raw || "").toLowerCase();
        return title.includes(q) || description.includes(q);
      });
    }, [query, searchData]);

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <SearchButton
            size="sm"
            onClick={() => setOpen(true)}
            placeholder="search documentation.."
            className={"hidden md:block"}
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            className={clsx(
              "fixed z-2 inset-0 bg-black/50 transition-opacity duration-300 ease-out",
              "data-[state=open]:opacity-100",
              "data-[state=closed]:opacity-0"
            )}
          />
          <Dialog.Content
            className={clsx(
              "fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[90%] max-w-[500px] rounded-lg p-4 shadow-lg",
              // Use your existing CSS variables for dark/light mode.
              "bg-secondary border border-border",
              "transition-all duration-300 ease-out",
              "data-[state=open]:opacity-100 data-[state=open]:scale-100",
              "data-[state=closed]:opacity-0 data-[state=closed]:scale-95"
            )}
          >
            <VisuallyHidden>
              <Dialog.DialogTitle></Dialog.DialogTitle>
            </VisuallyHidden>

            <div className="relative">
              <input type="text"
                className={clsx("w-full pl-10 pr-4 py-2 border rounded-lg",
                  "bg-[hsl(var(--input))] text-[var(--foreground)] border-[var(--color-border)]"
                )}

                placeholder="Search the docs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 
                                flex items-center 
                                pointer-events-none">
                <Search />
              </div>
            </div>

            {filteredDocs.length > 0 ? (
              <ul className="list-none p-0 max-h-[300px] overflow-y-auto">
                {filteredDocs.map((doc) => (
                  <li
                    key={doc._raw.flattenedPath}
                    className="gap-2 py-2 border-b border-[var(--color-border)]"
                  >
                    <Link href={`/docs/${doc._raw.flattenedPath}`} onClick={() => setOpen(false)}>
                      <div className="flex gap-2 font-bold">
                        <Text /> <div>{highlightText(doc.title, query)}</div>
                      </div>
                      <div className="text-sm">
                        {getSnippet(doc.body.raw || "No description", query)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pt-2 text-sm justify-self-center">{query.length > 0 ? `No results found.` : `Type to search`}</p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

SearchDialog.displayName = "SearchDialog";

export default SearchDialog;
