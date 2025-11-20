from flask import Blueprint, jsonify, request
from Config.db import db
import importlib
import os, json
from sqlalchemy import Table, select, and_, func as sa_func

routes_Data = Blueprint('routes_Data', __name__)

# Schemas and model classes will be imported lazily inside functions to avoid
# double-definition of tables in SQLAlchemy metadata when this module is
# imported in different phases of app startup.
material_schema = None
materials_schema = None
org_schema = None
orgs_schema = None
punto_schema = None
puntos_schema = None
contact_schema = None
contacts_schema = None


def _ensure_models():
    """Lazily import ORM model classes and initialize schema instances.
    This avoids importing model modules at top-level and reduces risk of
    metadata redefinition during app startup. Call this at the start of
    any CRUD endpoint that needs ORM model classes.
    """
    global Material, MaterialSchema, Organizacion, OrganizacionSchema, Punto, PuntoSchema, PuntoContacto, PuntoContactoSchema
    global material_schema, materials_schema, org_schema, orgs_schema, punto_schema, puntos_schema, contact_schema, contacts_schema

    if 'Material' in globals() and material_schema is not None:
        return

    # Import modules (if already imported, import_module returns cached module)
    mod_mat = importlib.import_module('Models.Material')
    mod_org = importlib.import_module('Models.Organizacion')
    mod_pun = importlib.import_module('Models.Punto')
    mod_pc = importlib.import_module('Models.PuntoContacto')

    Material = mod_mat.Material
    MaterialSchema = mod_mat.MaterialSchema
    Organizacion = mod_org.Organizacion
    OrganizacionSchema = mod_org.OrganizacionSchema
    Punto = mod_pun.Punto
    PuntoSchema = mod_pun.PuntoSchema
    PuntoContacto = mod_pc.PuntoContacto
    PuntoContactoSchema = mod_pc.PuntoContactoSchema

    # initialize schemas
    material_schema = MaterialSchema()
    materials_schema = MaterialSchema(many=True)
    org_schema = OrganizacionSchema()
    orgs_schema = OrganizacionSchema(many=True)
    punto_schema = PuntoSchema()
    puntos_schema = PuntoSchema(many=True)
    contact_schema = PuntoContactoSchema()
    contacts_schema = PuntoContactoSchema(many=True)


# --- CRUD Material ---
@routes_Data.route('/api/materiales', methods=['GET'])
def list_materiales():
    _ensure_models()
    mats = Material.query.order_by(Material.nombre).all()
    return jsonify(materials_schema.dump(mats))


@routes_Data.route('/api/materiales', methods=['POST'])
def create_material():
    _ensure_models()
    data = request.get_json() or {}
    nombre = data.get('nombre')
    if not nombre:
        return jsonify({'error':'nombre is required'}), 400
    m = Material.query.filter(db.func.lower(Material.nombre)==nombre.lower()).first()
    if m:
        return material_schema.jsonify(m), 200
    m = Material(nombre=nombre, slug=data.get('slug'), clase_icono=data.get('clase_icono'))
    db.session.add(m)
    db.session.commit()
    return material_schema.jsonify(m), 201


@routes_Data.route('/api/materiales/<int:id>', methods=['PUT'])
def update_material(id):
    _ensure_models()
    m = Material.query.get(id)
    if not m:
        return jsonify({'error':'not found'}), 404
    data = request.get_json() or {}
    m.nombre = data.get('nombre', m.nombre)
    m.slug = data.get('slug', m.slug)
    m.clase_icono = data.get('clase_icono', m.clase_icono)
    db.session.commit()
    return material_schema.jsonify(m)


@routes_Data.route('/api/materiales/<int:id>', methods=['DELETE'])
def delete_material(id):
    _ensure_models()
    m = Material.query.get(id)
    if not m:
        return jsonify({'error':'not found'}), 404
    db.session.delete(m)
    db.session.commit()
    return jsonify({'message':'deleted'})


# --- CRUD Organizacion ---
@routes_Data.route('/api/organizaciones', methods=['GET'])
def list_organizaciones():
    _ensure_models()
    items = Organizacion.query.order_by(Organizacion.nombre).all()
    return jsonify(orgs_schema.dump(items))


@routes_Data.route('/api/organizaciones', methods=['POST'])
def create_organizacion():
    _ensure_models()
    data = request.get_json() or {}
    nombre = data.get('nombre')
    if not nombre:
        return jsonify({'error':'nombre is required'}), 400
    o = Organizacion.query.filter(db.func.lower(Organizacion.nombre)==nombre.lower()).first()
    if o:
        return org_schema.jsonify(o), 200
    o = Organizacion(nombre=nombre, sitio_web=data.get('sitio_web'), telefono=data.get('telefono'), direccion=data.get('direccion'))
    db.session.add(o)
    db.session.commit()
    return org_schema.jsonify(o), 201


@routes_Data.route('/api/organizaciones/<int:id>', methods=['PUT'])
def update_organizacion(id):
    _ensure_models()
    o = Organizacion.query.get(id)
    if not o:
        return jsonify({'error':'not found'}), 404
    data = request.get_json() or {}
    o.nombre = data.get('nombre', o.nombre)
    o.sitio_web = data.get('sitio_web', o.sitio_web)
    o.telefono = data.get('telefono', o.telefono)
    o.direccion = data.get('direccion', o.direccion)
    db.session.commit()
    return org_schema.jsonify(o)


@routes_Data.route('/api/organizaciones/<int:id>', methods=['DELETE'])
def delete_organizacion(id):
    _ensure_models()
    o = Organizacion.query.get(id)
    if not o:
        return jsonify({'error':'not found'}), 404
    db.session.delete(o)
    db.session.commit()
    return jsonify({'message':'deleted'})


# --- CRUD Punto ---
@routes_Data.route('/api/puntos', methods=['GET'])
def list_puntos():
    _ensure_models()
    items = Punto.query.order_by(Punto.nombre).all()
    return jsonify(puntos_schema.dump(items))


@routes_Data.route('/api/puntos', methods=['POST'])
def create_punto():
    _ensure_models()
    data = request.get_json() or {}
    nombre = data.get('nombre')
    id_material = data.get('id_material')
    if not nombre or not id_material:
        return jsonify({'error':'nombre and id_material required'}), 400
    p = Punto(nombre=nombre, id_material=id_material, direccion=data.get('direccion'), lat=data.get('lat'), lng=data.get('lng'), organizacion_id=data.get('organizacion_id'))
    p.telefono = data.get('telefono')
    p.datos_crudos = data.get('datos_crudos')
    db.session.add(p)
    db.session.commit()
    # create contacts if provided
    for c in data.get('contactos', []) or []:
        pc = PuntoContacto(punto_id=p.id, tipo=c.get('tipo'), valor=c.get('valor'))
        db.session.add(pc)
    db.session.commit()
    return punto_schema.jsonify(p), 201


@routes_Data.route('/api/puntos/<int:id>', methods=['PUT'])
def update_punto(id):
    _ensure_models()
    p = Punto.query.get(id)
    if not p:
        return jsonify({'error':'not found'}), 404
    data = request.get_json() or {}
    p.nombre = data.get('nombre', p.nombre)
    p.direccion = data.get('direccion', p.direccion)
    p.lat = data.get('lat', p.lat)
    p.lng = data.get('lng', p.lng)
    p.telefono = data.get('telefono', p.telefono)
    p.organizacion_id = data.get('organizacion_id', p.organizacion_id)
    p.id_material = data.get('id_material', p.id_material)
    p.datos_crudos = data.get('datos_crudos', p.datos_crudos)
    db.session.commit()
    return punto_schema.jsonify(p)


@routes_Data.route('/api/puntos/<int:id>', methods=['DELETE'])
def delete_punto(id):
    _ensure_models()
    p = Punto.query.get(id)
    if not p:
        return jsonify({'error':'not found'}), 404
    db.session.delete(p)
    db.session.commit()
    return jsonify({'message':'deleted'})


# --- CRUD PuntoContacto ---
@routes_Data.route('/api/punto-contactos', methods=['GET'])
def list_punto_contactos():
    _ensure_models()
    items = PuntoContacto.query.all()
    return jsonify(contacts_schema.dump(items))


@routes_Data.route('/api/punto-contactos', methods=['POST'])
def create_punto_contacto():
    _ensure_models()
    data = request.get_json() or {}
    punto_id = data.get('punto_id')
    tipo = data.get('tipo')
    valor = data.get('valor')
    if not punto_id or not tipo:
        return jsonify({'error':'punto_id and tipo required'}), 400
    c = PuntoContacto(punto_id=punto_id, tipo=tipo, valor=valor)
    db.session.add(c)
    db.session.commit()
    return contact_schema.jsonify(c), 201


@routes_Data.route('/api/punto-contactos/<int:id>', methods=['PUT'])
def update_punto_contacto(id):
    _ensure_models()
    c = PuntoContacto.query.get(id)
    if not c:
        return jsonify({'error':'not found'}), 404
    data = request.get_json() or {}
    c.tipo = data.get('tipo', c.tipo)
    c.valor = data.get('valor', c.valor)
    db.session.commit()
    return contact_schema.jsonify(c)


@routes_Data.route('/api/punto-contactos/<int:id>', methods=['DELETE'])
def delete_punto_contacto(id):
    _ensure_models()
    c = PuntoContacto.query.get(id)
    if not c:
        return jsonify({'error':'not found'}), 404
    db.session.delete(c)
    db.session.commit()
    return jsonify({'message':'deleted'})


# --- Importer from scraping JSON ---
def import_scraping_data(json_file_path=None, commit=True):
    """Read scraping JSON and import into Material/Organizacion/Punto/PuntoContacto tables.
    If commit is True, commit DB changes. Returns a summary dict."""
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    if not json_file_path:
        json_file_path = os.path.join(base_dir, 'puntos_reciclaje_barranquilla.json')
    if not os.path.exists(json_file_path):
        return {'success': False, 'error': 'json not found', 'imported': 0}

    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Use reflected tables and SQL operations because at startup the ORM models
    # may already be registered in metadata; performing reflection and using
    # Core inserts/updates avoids Table re-definition issues and assumes the
    # tables already exist.
    try:
        material_table = Table('tbl_material', db.metadata, autoload_with=db.engine)
        organizacion_table = Table('tbl_organizacion', db.metadata, autoload_with=db.engine)
        punto_table = Table('tbl_punto', db.metadata, autoload_with=db.engine)
        punto_contacto_table = Table('tbl_punto_contacto', db.metadata, autoload_with=db.engine)
    except Exception as e:
        return {'success': False, 'error': f'Error reflejando tablas: {str(e)}', 'imported': 0}

    categorias = data.get('categorias') or []
    imported = 0

    try:
        with db.session.begin():
            for cat in categorias:
                mat_nombre = (cat.get('material') or '').strip()
                org_nombre = (cat.get('organizacion') or '').strip()

                if not mat_nombre:
                    continue

                # material: find by name case-insensitive
                mat_id = None
                r = db.session.execute(select(material_table.c.id).where(sa_func.lower(material_table.c.nombre) == mat_nombre.lower())).fetchone()
                if r:
                    mat_id = r[0]
                else:
                    res = db.session.execute(material_table.insert().values(nombre=mat_nombre))
                    try:
                        mat_id = int(res.inserted_primary_key[0])
                    except Exception:
                        mat_id = int(res.lastrowid) if hasattr(res, 'lastrowid') else None

                # organizacion
                org_id = None
                if org_nombre:
                    r = db.session.execute(select(organizacion_table.c.id).where(sa_func.lower(organizacion_table.c.nombre) == org_nombre.lower())).fetchone()
                    if r:
                        org_id = r[0]
                    else:
                        res = db.session.execute(organizacion_table.insert().values(nombre=org_nombre))
                        try:
                            org_id = int(res.inserted_primary_key[0])
                        except Exception:
                            org_id = int(res.lastrowid) if hasattr(res, 'lastrowid') else None

                puntos = cat.get('puntos') or []
                for punto in puntos:
                    nombre = (punto.get('nombre') or punto.get('texto_completo') or '').strip()
                    telefono = punto.get('telefono')
                    texto = punto.get('texto_completo') or ''

                    # Find existing punto by name + material
                    existing = db.session.execute(
                        select(punto_table.c.id).where(and_(sa_func.lower(punto_table.c.nombre) == nombre.lower(), punto_table.c.id_material == mat_id))
                    ).fetchone()

                    if existing:
                        punto_id = existing[0]
                        # update
                        db.session.execute(
                            punto_table.update().where(punto_table.c.id == punto_id).values(telefono=telefono, direccion=texto, datos_crudos=json.dumps(punto), organizacion_id=org_id)
                        )
                        imported += 1
                        # ensure contact exists
                        if telefono:
                            pc_exist = db.session.execute(
                                select(punto_contacto_table.c.id).where(and_(punto_contacto_table.c.punto_id == punto_id, punto_contacto_table.c.tipo == 'telefono', punto_contacto_table.c.valor == telefono))
                            ).fetchone()
                            if not pc_exist:
                                db.session.execute(punto_contacto_table.insert().values(punto_id=punto_id, tipo='telefono', valor=telefono))
                        continue

                    # create new punto
                    res = db.session.execute(
                        punto_table.insert().values(nombre=nombre, id_material=mat_id, direccion=texto, telefono=telefono, organizacion_id=org_id, datos_crudos=json.dumps(punto))
                    )
                    try:
                        punto_id = int(res.inserted_primary_key[0])
                    except Exception:
                        punto_id = int(res.lastrowid) if hasattr(res, 'lastrowid') else None

                    if telefono:
                        db.session.execute(punto_contacto_table.insert().values(punto_id=punto_id, tipo='telefono', valor=telefono))
                    imported += 1
    except Exception as e:
        db.session.rollback()
        return {'success': False, 'error': str(e), 'imported': imported}

    if commit:
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {'success': False, 'error': str(e), 'imported': imported}

    return {'success': True, 'imported': imported}