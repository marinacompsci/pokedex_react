import styled from "styled-components";
import Select from "../Select";

const Wrapper = styled.div`
  line-height: 1.6;
  padding: 1rem;

  h1 {
    margin-bottom: 0.5em;
  }

  p,
  ul,
  ol {
    margin-bottom: 1em;
  }
`;

export default function Prompt() {
  return (
    <Wrapper>
      <h1>React Interview Project</h1>
      <p>Let's implement a basic Pokedex. At a high level, we want:</p>
      <ol>
        <li>
          A dropdown that has a list of the OG 150 Pokemon which we can use to
          set the currently active Pokemon.
        </li>
        <li>
          A card that displays an image, the name, and a brief description of
          the currently active Pokemon.
        </li>
        <li>
          "Previous" and "Next" buttons that, when pressed, will set the
          previous or next Pokemon as the currently active Pokemon.
        </li>
      </ol>
      <p>
        This feature list is flexible. If you have an idea for something you'd
        like to add, feel free to suggest it.
      </p>
      <p>
        The designs don't have to be exact, but we want the look to generally
        match. That said, prioritize getting the functionality working before
        spending too much time on design.
      </p>
      <p>
        Designs and design specs{" "}
        <a
          href="https://www.figma.com/file/D7zpAhRq7Zy2LKDzpk1VfV/Pokedex-Interview-Project?node-id=0%3A1"
          target="_blank"
          rel="noreferrer"
        >
          are available here
        </a>
        .
      </p>
      <p>
        We already built out the Select to get you started (and cause styling
        selects can be such a pain).
      </p>
      <Select>
        <option>Check it out</option>
        <option>We already built this one</option>
        <option>So you don't have to</option>
      </Select>
      <br />
      <p>
        <strong>We can't stress this enough: We're here to help.</strong> Please
        ask questions if you need help with something. This is not about whether
        or not you know how to implement all these features, but seeing how you
        work and how you approach problem solving. We also don't expect you to
        finish, so don't worry if you don't get through everything.
      </p>
    </Wrapper>
  );
}
