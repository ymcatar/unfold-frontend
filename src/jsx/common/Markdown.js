import marked from 'marked';

let lexer = new marked.Lexer();
lexer.rules.heading = { exec: function() {}};
lexer.rules.image = { exec: function() {}};

export default function(content){
    return marked.parser(lexer.lex(content));
}
