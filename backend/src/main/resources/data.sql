-- DATOS PARAMETRICOS DE UBICACION
-- PROVINCIA
INSERT INTO provincia (id, nombre, codigo_provincia) VALUES (58, 'NEUQUÉN', 58);

-- REGION
INSERT INTO region (id, nombre, provincia_id) VALUES (1, 'Sin declarar', 58);
INSERT INTO region (id, nombre, provincia_id) VALUES (2, 'Indeterminado', 58);
INSERT INTO region (id, nombre, provincia_id) VALUES (3, 'del Pehuén', 58);
INSERT INTO region (id, nombre, provincia_id) VALUES (4, 'Vaca Muerta', 58);
INSERT INTO region (id, nombre, provincia_id) VALUES (5, 'de los Lagos del Sur', 58);
INSERT INTO region (id, nombre, provincia_id) VALUES (6, 'Alto Neuquén', 58);
INSERT INTO region (id, nombre, provincia_id) VALUES (7, 'del Limay', 58);
INSERT INTO region (id, nombre, provincia_id) VALUES (8, 'Confluencia', 58);
INSERT INTO region (id, nombre, provincia_id) VALUES (9, 'de la Comarca', 58);

-- DEPARTAMENTO
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (1, 'Sin declarar', 58999, 1);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (2, 'Indeterminado', 58998, 2);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (3, 'Aluminé', 58007, 3);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (4, 'Añelo', 58014, 4);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (5, 'Catán Lil', 58021, 3);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (7, 'Chos Malal', 58042, 6);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (8, 'Collón Curá', 58028, 7);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (9, 'Confluencia', 58035, 8);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (11, 'Huiliches', 58049, 5);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (12, 'Lácar', 58056, 5);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (13, 'Loncopué', 58063, 6);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (14, 'Los Lagos', 58070, 5);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (15, 'Minas', 58077, 6);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (16, 'Ñorquín', 58084, 6);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (17, 'Pehuenches', 58091, 4);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (18, 'Picún Leufú', 58098, 7);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (19, 'Picunches', 58105, 3);
INSERT INTO departamento (id, nombre, codigo_departamento, region_id) VALUES (20, 'Zapala', 58112, 3);

-- CIUDAD
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (1, 'Sin Gobierno Local', 580000, (SELECT id FROM departamento WHERE codigo_departamento=58999));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (2, 'Indeterminado', 589998, (SELECT id FROM departamento WHERE codigo_departamento=58998));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (3, 'Aluminé', 580007, (SELECT id FROM departamento WHERE codigo_departamento=58007));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (4, 'Villa Pehuenia', 580252, (SELECT id FROM departamento WHERE codigo_departamento=58007));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (5, 'San Patricio del Chañar', 580021, (SELECT id FROM departamento WHERE codigo_departamento=58014));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (6, 'Añelo', 580014, (SELECT id FROM departamento WHERE codigo_departamento=58014));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (7, 'Aguada San Roque', 585014, (SELECT id FROM departamento WHERE codigo_departamento=58014));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (8, 'Los Chihuidos', 585021, (SELECT id FROM departamento WHERE codigo_departamento=58014));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (9, 'Las Coloradas', 580028, (SELECT id FROM departamento WHERE codigo_departamento=58021));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (10, 'Pilo Lil', 585028, (SELECT id FROM departamento WHERE codigo_departamento=58021));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (11, 'Villa Puente Picún Leufú', 585154, (SELECT id FROM departamento WHERE codigo_departamento=58021));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (12, 'Chos Malal', 580098, (SELECT id FROM departamento WHERE codigo_departamento=58042));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (13, 'Tricao Malal', 580105, (SELECT id FROM departamento WHERE codigo_departamento=58042));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (14, 'Coyuco - Cochico', 585049, (SELECT id FROM departamento WHERE codigo_departamento=58042));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (15, 'Villa Curi Leuvú', 585056, (SELECT id FROM departamento WHERE codigo_departamento=58042));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (16, 'Piedra del Águila', 580035, (SELECT id FROM departamento WHERE codigo_departamento=58028));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (17, 'Santo Tomás', 585035, (SELECT id FROM departamento WHERE codigo_departamento=58028));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (18, 'Centenario', 580042, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (19, 'Cutral Co', 580049, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (20, 'Neuquén', 580056, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (21, 'Plaza Huincul', 580063, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (22, 'Plottier', 580070, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (23, 'Senillosa', 580077, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (24, 'Villa El Chocón', 580084, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (25, 'Vista Alegre', 580091, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (26, 'Sauzal Bonito', 585042, (SELECT id FROM departamento WHERE codigo_departamento=58035));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (27, 'Junín de los Andes', 580112, (SELECT id FROM departamento WHERE codigo_departamento=58049));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (28, 'San Martín de los Andes', 580119, (SELECT id FROM departamento WHERE codigo_departamento=58056));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (29, 'Loncopué', 580126, (SELECT id FROM departamento WHERE codigo_departamento=58063));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (30, 'Chorriaca', 585063, (SELECT id FROM departamento WHERE codigo_departamento=58063));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (31, 'Villa La Angostura', 580133, (SELECT id FROM departamento WHERE codigo_departamento=58070));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (32, 'Villa Traful', 585070, (SELECT id FROM departamento WHERE codigo_departamento=58070));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (33, 'Andacollo', 580140, (SELECT id FROM departamento WHERE codigo_departamento=58077));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (34, 'Las Ovejas', 580154, (SELECT id FROM departamento WHERE codigo_departamento=58077));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (35, 'Huinganco', 580147, (SELECT id FROM departamento WHERE codigo_departamento=58077));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (36, 'Los Miches', 580161, (SELECT id FROM departamento WHERE codigo_departamento=58077));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (37, 'Guañacos', 585077, (SELECT id FROM departamento WHERE codigo_departamento=58077));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (38, 'Manzano Amargo', 585084, (SELECT id FROM departamento WHERE codigo_departamento=58077));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (39, 'Varvarco - Invernada Vieja', 585091, (SELECT id FROM departamento WHERE codigo_departamento=58077));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (40, 'Villa del Nahueve', 585098, (SELECT id FROM departamento WHERE codigo_departamento=58077));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (41, 'Caviahue - Copahue', 580168, (SELECT id FROM departamento WHERE codigo_departamento=58084));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (42, 'El Cholar', 580175, (SELECT id FROM departamento WHERE codigo_departamento=58084));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (43, 'El Huecú', 580182, (SELECT id FROM departamento WHERE codigo_departamento=58084));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (44, 'Taquimilán', 580189, (SELECT id FROM departamento WHERE codigo_departamento=58084));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (45, 'Rincón de los Sauces', 580210, (SELECT id FROM departamento WHERE codigo_departamento=58091));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (46, 'Buta Ranquil', 580203, (SELECT id FROM departamento WHERE codigo_departamento=58091));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (47, 'Barrancas', 580196, (SELECT id FROM departamento WHERE codigo_departamento=58091));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (48, 'Octavio Pico', 585105, (SELECT id FROM departamento WHERE codigo_departamento=58091));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (49, 'Picún Leufú', 580217, (SELECT id FROM departamento WHERE codigo_departamento=58098));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (50, 'El Sauce', 585112, (SELECT id FROM departamento WHERE codigo_departamento=58098));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (51, 'Paso Aguerre', 585119, (SELECT id FROM departamento WHERE codigo_departamento=58098));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (52, 'Las Lajas', 580231, (SELECT id FROM departamento WHERE codigo_departamento=58105));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (53, 'Bajada del Agrio', 580224, (SELECT id FROM departamento WHERE codigo_departamento=58105));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (54, 'Quili Malal', 585126, (SELECT id FROM departamento WHERE codigo_departamento=58105));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (55, 'Zapala', 580245, (SELECT id FROM departamento WHERE codigo_departamento=58112));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (56, 'Mariano Moreno', 580238, (SELECT id FROM departamento WHERE codigo_departamento=58112));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (57, 'Covunco Abajo', 585133, (SELECT id FROM departamento WHERE codigo_departamento=58112));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (58, 'Los Catutos', 585140, (SELECT id FROM departamento WHERE codigo_departamento=58112));
INSERT INTO ciudad (id, nombre, codigo_ciudad, departamento_id) VALUES (59, 'Ramón M. Castro', 585147, (SELECT id FROM departamento WHERE codigo_departamento=58112));

-- PERSONAS FICTICIAS
INSERT INTO PERSONA (APELLIDO, NOMBRE, CUIT) VALUES
                                                 ('García',     'Juan Carlos',      '20123456784'),
                                                 ('Rodríguez',  'María Laura',      '27234567891'),
                                                 ('Martínez',   'Carlos Alberto',   '20345678903'),
                                                 ('López',      'Ana María',        '27345678912'),
                                                 ('Fernández',  'Diego Martín',     '20198765437'),
                                                 ('González',   'Laura Patricia',   '27111222333'),
                                                 ('Pérez',      'Roberto Luis',     '20456789015'),
                                                 ('Sánchez',    'Carolina Soledad', '27456789026'),
                                                 ('Romero',     'Facundo Gabriel',  '20234567895'),
                                                 ('Torres',     'Valeria Romina',   '27298765431'),
                                                 ('Ruiz',       'Marcelo Fabián',   '20157684329'),
                                                 ('Ramírez',    'Claudia Verónica', '27543219876'),
                                                 ('Flores',     'Matías Ezequiel',  '20321098764'),
                                                 ('Benítez',    'Natalia Andrea',   '27321098762'),
                                                 ('Acosta',     'Guillermo José',   '20145678904'),
                                                 ('Medina',     'Silvia Beatriz',   '27145678908'),
                                                 ('Herrera',    'Pablo Sebastián',  '20432198765'),
                                                 ('Aguirre',    'Mariana Elizabeth','27432198763'),
                                                 ('Giménez',    'Lucas Nahuel',     '20278945612'),
                                                 ('Vargas',     'Lucía Belén',      '27278945610'),
                                                 ('Castro',     'Eduardo Daniel',   '20189012345'),
                                                 ('Molina',     'Gabriela Noelia',  '27189012349'),
                                                 ('Ortiz',      'Federico Andrés',  '20398765432'),
                                                 ('Gutiérrez',  'Julieta Sol',      '27398765430'),
                                                 ('Silva',      'Hugo Marcelo',     '20176543218'),
                                                 ('Delgado',    'Florencia Ayelén', '27176543216'),
                                                 ('Rojas',      'Esteban Raúl',     '20487654329'),
                                                 ('Moreno',     'Carla Vanesa',     '27487654327'),
                                                 ('Navarro',    'Tomás Agustín',    '20215678943'),
                                                 ('Cabrera',    'Camila Sofía',     '27215678941'),
                                                 ('Ramos',      'Walter Omar',      '20139876542'),
                                                 ('Luna',       'Paola Daniela',    '27139876546'),
                                                 ('Sosa',       'Nicolás Iván',     '20357643218'),
                                                 ('Domínguez',  'Melina Rocío',     '27357643216'),
                                                 ('Alvarez',    'Ricardo Horacio',  '20123459876'),
                                                 ('Mansilla',   'Eugenia Tamara',   '27123459874'),
                                                 ('Paz',        'Leonel Matías',    '20456712389'),
                                                 ('Cruz',       'Yanina Giselle',   '27456712387'),
                                                 ('Riquelme',   'Brian Alexis',     '20298745613'),
                                                 ('Vera',       'Daiana Vanesa',    '27298745611'),
                                                 ('Escobar',    'Sergio Fabián',    '20154321987'),
                                                 ('Ibarra',     'Lorena Beatriz',   '27154321985'),
                                                 ('Coronel',    'Jonathan David',   '20321987654'),
                                                 ('Ojeda',      'Macarena Solange', '27321987652'),
                                                 ('Barrios',    'Emiliano José',    '20187654329'),
                                                 ('Figueroa',   'Celeste Ayelén',   '27187654327'),
                                                 ('Moyano',     'Cristian Ariel',   '20432187659'),
                                                 ('Villalba',   'Marisol Belén',    '27432187657'),
                                                 ('Ayala',      'Maximiliano',      '20276543218'),
                                                 ('Chavez',     'Jésica Pamela',    '27276543216'),
                                                 ('Juarez',     'Gustavo Adrián',   '20145682379'),
                                                 ('Díaz',       'Mariela Alejandra','27145682377'),
                                                 ('Suárez',     'Franco Emanuel',   '20398712984'),
                                                 ('Rivero',     'Candela Milagros', '27398712982'),
                                                 ('Ferrari',    'Alejandro Daniel', '20132165498'),
                                                 ('Carrizo',    'Romina Elizabeth', '27132165496'),
                                                 ('Soria',      'Santiago Joel',    '20487612983'),
                                                 ('Quiroga',    'Valentina Sol',    '27487612981'),
                                                 ('Blanco',     'Mariano Ezequiel', '20254318769'),
                                                 ('Roldán',     'Lucila Candela',   '27254318767'),
                                                 ('Leiva',      'Darío Fabián',     '20198732165'),
                                                 ('Aranda',     'Johana Vanesa',    '27198732163'),
                                                 ('Zarate',     'Ezequiel Nahuel',  '20345612987'),
                                                 ('Velázquez',  'Milagros Abigail', '27345612985'),
                                                 ('Salas',      'Rubén Darío',      '20176512984'),
                                                 ('Correa',     'Tamara Soledad',   '27176512982'),
                                                 ('Maldonado',  'Thiago Benjamín',  '20432159876'),
                                                 ('Peralta',    'Lourdes Yamila',   '27432159874'),
                                                 ('Godoy',      'Mauricio Ariel',   '20218976543'),
                                                 ('Barrientos', 'Brenda Nicole',    '27218976541'),
                                                 ('Gallo',      'Fabián Osvaldo',   '20157612983'),
                                                 ('Lucero',     'María José',       '27157612981'),
                                                 ('Britez',     'Axel Iván',        '20321054328'),
                                                 ('Funes',      'Catalina Sol',     '27321054326'),
                                                 ('Toledo',     'Ramón Alberto',    '20189054321'),
                                                 ('Arias',      'Lorena Marcela',   '27189054329'),
                                                 ('Montiel',    'Agustín Nicolás',  '20456754328'),
                                                 ('Cáceres',    'Delfina Belén',    '27456754326'),
                                                 ('Vera',       'Mario Ernesto',    '20234512987'),
                                                 ('Gimenez',    'Erika Vanina',     '27234512985'),
                                                 ('Ferreyra',   'Leandro Gabriel',  '20143219876'),
                                                 ('Soto',       'Florencia Magalí', '27143219874'),
                                                 ('Ponce',      'Rodrigo Damián',   '20387654321'),
                                                 ('Vega',       'Antonella Sol',    '27387654329'),
                                                 ('Ríos',       'Héctor Raúl',      '20129876543'),
                                                 ('Campos',     'María Celeste',    '27129876541'),
                                                 ('Castillo',   'Joaquín Mateo',    '20412987654'),
                                                 ('Ledesma',    'Valeria Soledad',  '27412987652'),
                                                 ('Guzmán',     'Emilio José',      '20276519843'),
                                                 ('Sandoval',   'Luciana Abigail',  '27276519841'),
                                                 ('Nuñez',      'Oscar Daniel',     '20154329876'),
                                                 ('Contreras',  'Carolina Ivana',   '27154329874'),
                                                 ('Tapia',      'Facundo Nahuel',   '20398765439'),
                                                 ('Mendoza',    'Juliana Solange',  '27398765437'),
                                                 ('Verón',      'Gabriel Alejandro','20132198765'),
                                                 ('Palacios',   'Natalia Soledad',  '27132198763'),
                                                 ('Britos',     'Matías Leonel',    '20487654328'),
                                                 ('Duarte',     'Camila Agustina',  '27487654326');

-- INMUEBLES FICTICIOS
INSERT INTO INMUEBLE (MATRICULA, NOMENCLATURA, CIUDAD_ID, DEPARTAMENTO_ID) VALUES
                                                                               ('0001000001', '01230567899900125487',  3,  3),  -- Aluminé
                                                                               ('0001000002', '08761234500123998765',  4,  3),  -- Villa Pehuenia
                                                                               ('0001000003', '04550987654321012345',  5,  4),  -- San Patricio del Chañar
                                                                               ('0001000004', '11223344556677889900',  6,  4),  -- Añelo
                                                                               ('0001000005', '99887766554433221100',  7,  4),  -- Aguada San Roque
                                                                               ('0001000006', '13579086420975318642',  8,  4),  -- Los Chihuidos
                                                                               ('0001000007', '22331144556677889900',  9,  5),  -- Las Coloradas
                                                                               ('0001000008', '99990011882244667755', 10,  5),  -- Pilo Lil
                                                                               ('0001000009', '00112233445566778899', 11,  5),  -- Villa Puente Picún Leufú
                                                                               ('0001000010', '55443322110099887766', 12,  7),  -- Chos Malal
                                                                               ('0001000011', '10203040506070809011', 13,  7),  -- Tricao Malal
                                                                               ('0001000012', '98765432101234567890', 14,  7),  -- Coyuco - Cochico
                                                                               ('0001000013', '11224466881236547890', 15,  7),  -- Villa Curi Leuvú
                                                                               ('0001000014', '36925814703691472583', 16,  8),  -- Piedra del Águila
                                                                               ('0001000015', '77889900112233445566', 17,  8),  -- Santo Tomás
                                                                               ('0001000016', '01010101020202020303', 18,  9),  -- Centenario
                                                                               ('0001000017', '99887766554433221199', 19,  9),  -- Cutral Co
                                                                               ('0001000018', '12345678909876543210', 20,  9),  -- Neuquén (capital)
                                                                               ('0001000019', '55667788990011223344', 21,  9),  -- Plaza Huincul
                                                                               ('0001000020', '10293847561209384756', 22,  9),  -- Plottier
                                                                               ('0001000021', '99881122334455667788', 23,  9),  -- Senillosa
                                                                               ('0001000022', '00123456789012345678', 24,  9),  -- Villa El Chocón
                                                                               ('0001000023', '99998888777766665555', 25,  9),  -- Vista Alegre
                                                                               ('0001000024', '44556677889900112233', 26,  9),  -- Sauzal Bonito
                                                                               ('0001000025', '36914725803691472581', 27, 11),  -- Junín de los Andes
                                                                               ('0001000026', '77880011223344556677', 28, 12),  -- San Martín de los Andes
                                                                               ('0001000027', '55446688002244668800', 29, 13),  -- Loncopué
                                                                               ('0001000028', '98712365478932145665', 30, 13),  -- Chorriaca
                                                                               ('0001000029', '11229988776655443322', 31, 14),  -- Villa La Angostura
                                                                               ('0001000030', '77889955443322110099', 32, 14),  -- Villa Traful
                                                                               ('0001000031', '00115577991133557799', 33, 15),  -- Andacollo
                                                                               ('0001000032', '44332211009988776655', 34, 15),  -- Las Ovejas
                                                                               ('0001000033', '99887700112233445566', 35, 15),  -- Huinganco
                                                                               ('0001000034', '55663322114477332211', 36, 15),  -- Los Miches
                                                                               ('0001000035', '11229955007788332211', 37, 15),  -- Guañacos
                                                                               ('0001000036', '99887766554433221188', 38, 15),  -- Manzano Amargo
                                                                               ('0001000037', '33445566778899001122', 39, 15),  -- Varvarco - Invernada Vieja
                                                                               ('0001000038', '77889900112233445577', 40, 15),  -- Villa del Nahueve
                                                                               ('0001000039', '22334455667788990011', 41, 16),  -- Caviahue - Copahue
                                                                               ('0001000040', '98765432109876543210', 42, 16),  -- El Cholar
                                                                               ('0001000041', '00112233445566778899', 43, 16),  -- El Huecú
                                                                               ('0001000042', '55443322110099887766', 44, 16),  -- Taquimilán
                                                                               ('0001000043', '77889900112233445566', 45, 17),  -- Rincón de los Sauces
                                                                               ('0001000044', '11223344556677889900', 46, 17),  -- Buta Ranquil
                                                                               ('0001000045', '99887766554433221100', 47, 17),  -- Barrancas
                                                                               ('0001000046', '55667788990011223344', 48, 17),  -- Octavio Pico
                                                                               ('0001000047', '33445566778899001122', 49, 18),  -- Picún Leufú
                                                                               ('0001000048', '77889900112233445566', 50, 18),  -- El Sauce
                                                                               ('0001000049', '11223344556677889900', 51, 18),  -- Paso Aguerre
                                                                               ('0001000050', '99887766554433221100', 52, 19),  -- Las Lajas
                                                                               ('0001000051', '55667788990011223344', 53, 19),  -- Bajada del Agrio
                                                                               ('0001000052', '33445566778899001122', 54, 19),  -- Quili Malal
                                                                               ('0001000053', '77889900112233445566', 55, 20),  -- Zapala
                                                                               ('0001000054', '11223344556677889900', 56, 20),  -- Mariano Moreno
                                                                               ('0001000055', '99887766554433221100', 57, 20),  -- Covunco Abajo
                                                                               ('0001000056', '55667788990011223344', 58, 20),  -- Los Catutos
                                                                               ('0001000057', '33445566778899001122', 59, 20),  -- Ramón M. Castro
                                                                               ('0001000058', '77889900112233445566', 20,  9),  -- Neuquén capital (más inmuebles)
                                                                               ('0001000059', '11223344556677889900', 20,  9),
                                                                               ('0001000060', '99887766554433221100', 20,  9),
                                                                               ('0001000061', '55667788990011223344', 21,  9),  -- Plaza Huincul
                                                                               ('0001000062', '33445566778899001122', 22,  9),  -- Plottier
                                                                               ('0001000063', '77889900112233445566', 28, 12),  -- San Martín de los Andes
                                                                               ('0001000064', '11223344556677889900', 31, 14),  -- Villa La Angostura
                                                                               ('0001000065', '99887766554433221100', 55, 20),  -- Zapala
                                                                               ('0001000066', '55667788990011223344',  3,  3),  -- Aluminé
                                                                               ('0001000067', '33445566778899001122',  4,  3),  -- Villa Pehuenia
                                                                               ('0001000068', '77889900112233445566', 18,  9),
                                                                               ('0001000069', '11223344556677889900', 19,  9),
                                                                               ('0001000070', '99887766554433221100', 20,  9),
                                                                               ('0001000071', '55667788990011223344', 20,  9),
                                                                               ('0001000072', '33445566778899001122', 20,  9),
                                                                               ('0001000073', '77889900112233445566', 21,  9),
                                                                               ('0001000074', '11223344556677889900', 22,  9),
                                                                               ('0001000075', '99887766554433221100', 23,  9),
                                                                               ('0001000076', '55667788990011223344', 27, 11),
                                                                               ('0001000077', '33445566778899001122', 28, 12),
                                                                               ('0001000078', '77889900112233445566', 31, 14),
                                                                               ('0001000079', '11223344556677889900', 33, 15),
                                                                               ('0001000080', '99887766554433221100', 41, 16),
                                                                               ('0001000081', '55667788990011223344', 45, 17),
                                                                               ('0001000082', '33445566778899001122', 52, 19),
                                                                               ('0001000083', '77889900112233445566', 55, 20),
                                                                               ('0001000084', '11223344556677889900', 55, 20),
                                                                               ('0001000085', '99887766554433221100', 20,  9),
                                                                               ('0001000086', '55667788990011223344', 20,  9),
                                                                               ('0001000087', '33445566778899001122', 28, 12),
                                                                               ('0001000088', '77889900112233445566', 31, 14),
                                                                               ('0001000089', '11223344556677889900',  9,  5),
                                                                               ('0001000090', '99887766554433221100', 16,  8),
                                                                               ('0001000091', '55667788990011223344', 27, 11),
                                                                               ('0001000092', '33445566778899001122', 12,  7),
                                                                               ('0001000093', '77889900112233445566', 20,  9),
                                                                               ('0001000094', '11223344556677889900', 20,  9),
                                                                               ('0001000095', '99887766554433221100', 21,  9),
                                                                               ('0001000096', '55667788990011223344', 55, 20),
                                                                               ('0001000097', '33445566778899001122',  3,  3),
                                                                               ('0001000098', '77889900112233445566',  4,  3),
                                                                               ('0001000099', '11223344556677889900', 20,  9),
                                                                               ('0001000100', '99887766554433221100', 20,  9);   -- Neuquén capital

-- TITULARIDAD DE INMUEBLES
INSERT INTO TITULARIDAD (INMUEBLE_ID, PERSONA_ID, NUMERADOR, DENOMINADOR) VALUES
                                                                              (1, 15, 1, 3),
                                                                              (1, 4, 1, 3),
                                                                              (1, 95, 1, 3),
                                                                              (2, 34, 1, 2),
                                                                              (2, 31, 1, 2),
                                                                              (3, 91, 1, 1),
                                                                              (4, 74, 1, 3),
                                                                              (4, 13, 1, 3),
                                                                              (4, 80, 1, 3),
                                                                              (5, 6, 1, 2),
                                                                              (5, 5, 1, 2),
                                                                              (6, 72, 1, 1),
                                                                              (7, 7, 1, 3),
                                                                              (7, 82, 1, 3),
                                                                              (7, 32, 1, 3),
                                                                              (8, 83, 1, 3),
                                                                              (8, 63, 1, 3),
                                                                              (8, 38, 1, 3),
                                                                              (9, 93, 1, 3),
                                                                              (9, 46, 2, 3),
                                                                              (10, 27, 1, 1),
                                                                              (11, 68, 1, 3),
                                                                              (11, 56, 1, 3),
                                                                              (11, 48, 1, 3),
                                                                              (12, 39, 1, 1),
                                                                              (13, 20, 1, 2),
                                                                              (13, 18, 1, 2),
                                                                              (14, 62, 1, 3),
                                                                              (14, 50, 2, 3),
                                                                              (15, 85, 1, 3),
                                                                              (15, 98, 1, 3),
                                                                              (15, 24, 1, 3),
                                                                              (16, 17, 1, 3),
                                                                              (16, 57, 2, 3),
                                                                              (17, 71, 1, 3),
                                                                              (17, 41, 1, 3),
                                                                              (17, 14, 1, 3),
                                                                              (18, 69, 1, 1),
                                                                              (19, 81, 1, 1),
                                                                              (20, 10, 1, 2),
                                                                              (20, 90, 1, 2),
                                                                              (21, 44, 1, 1),
                                                                              (22, 53, 1, 3),
                                                                              (22, 70, 2, 3),
                                                                              (23, 43, 1, 1),
                                                                              (24, 26, 1, 2),
                                                                              (24, 78, 1, 2),
                                                                              (25, 79, 1, 3),
                                                                              (25, 9, 1, 3),
                                                                              (25, 75, 1, 3);

INSERT INTO TITULARIDAD (INMUEBLE_ID, PERSONA_ID, NUMERADOR, DENOMINADOR) VALUES
                                                                              (51, 15, 1, 1), -- Acosta Guillermo Jose
                                                                              (52, 1, 1, 1), -- Garcia Juan Carlos
                                                                              (53, 1, 1, 1), -- Garcia Juan Carlos
                                                                              (54, 1, 1, 2), -- Garcia Juan Carlos
                                                                              (54, 15, 1, 2), -- Acosta Guillermo Jose
                                                                              (25, 16, 1, 1); -- Medina Silvia Beatriz
