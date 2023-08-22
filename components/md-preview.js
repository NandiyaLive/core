import MarkdownPreview from "@uiw/react-markdown-preview";

const MDPreview = ({ sorce }) => {
  return (
    <div className="border rounded p-2">
      <MarkdownPreview
        source={sorce}
        rehypeRewrite={(node, index, parent) => {
          if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
            parent.children = parent.children.slice(1);
          }
        }}
        wrapperElement={{
          "data-color-mode": "light",
        }}
      />
    </div>
  );
};

export default MDPreview;
